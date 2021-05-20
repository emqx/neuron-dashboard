import { ref, computed, Ref, onMounted, ComputedRef } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useAPI from '../useAPI'
import usePagination from '../usePagination'

import { AttributeTypeList } from '@/config/index'
import { uniqBy, chunk } from 'lodash'
import { handleExcelFile } from '@/plugins/excelData'
import { ObjdModel, OattModel, AaddModel } from '@/types/neuron'
import { Merge } from 'type-fest'

interface SheetItem {
  pref: string
  objn: string
  suff: string
  updt: number
  logt: number
  tstd: number
  obsz: number
  attn: string
  attt: string
  deci: number
  achg: number
  adis: number
  attr: string
  rtim: number
  addr: string
  unit: string
  desc: string
}

type ParamsObj = Omit<ObjdModel, 'func'>

export function useUploadObject(): {
  uploadLoading: Ref<boolean>
  handleUploadChange: (file: { raw: File }) => Promise<void>
} {
  const uploadLoading = ref(false)
  const { addObjectData } = useAPI()

  const createObjListData = (sheets: Array<SheetItem>): Array<ParamsObj> => {
    // get object list by uniq object-name
    const objList: Array<ParamsObj> = uniqBy(
      sheets.map(({ objn, logt, updt, obsz }) => ({
        logt,
        // just for init
        oatt: [],
        objn,
        obsz,
        odes: [],
        updt,
      })),
      'objn',
    )
    objList.forEach((obj) => {
      // get table data which belong this obj by object-name
      const allItemBelongThisObj = sheets.filter(({ objn }) => objn === obj.objn)
      // get fields which is required & uniq by attr-name
      const attrArr: Array<OattModel> = uniqBy(
        allItemBelongThisObj.map(({ attn, attt, attr, deci, rtim, unit }) => ({
          attn,
          attt,
          deci,
          attr,
          rtim,
          // FIXME:
          unit: 'C',
          // just for init
          aadd: [],
        })),
        (currentObj: OattModel) => currentObj.attn,
      )
      attrArr.forEach((attr) => {
        attr.aadd = allItemBelongThisObj
          .filter((currentObj) => currentObj.attn === attr.attn)
          .map(({ addr, desc }, index) => ({
            obix: index,
            addr,
            // FIXME:
            desc: (index + 1).toString(),
          }))
      })
      obj.oatt = attrArr
    })
    return objList
  }

  const handleUploadChange = async (file: { raw: File }) => {
    try {
      uploadLoading.value = true
      const data = await handleExcelFile(file)
      const { sheet } = data[0]
      const params = createObjListData(sheet as Array<SheetItem>)
      addObjectData(params)
      uploadLoading.value = false
    } catch (error) {
      EmqxMessage.error(error)
    }
  }

  return {
    uploadLoading,
    handleUploadChange,
  }
}

/**
 * Use these fields to resolve the bug of input-number component in element-plus
 * If init obsz fields by value undefined, the form will throw error when the input-number is inputting
 */
type ObjectSetupFormForInput = Partial<Record<'sizeInput' | 'logTimeInput' | 'updateTimeInput', undefined | number>>

type ObjectSetupForm = Merge<ParamsObj, ObjectSetupFormForInput>

const createRawObject = (): ObjectSetupForm => ({
  oatt: [],
  objn: '',
  obsz: 0,
  odes: [],
  logt: 0,
  updt: 0,

  sizeInput: undefined,
  logTimeInput: undefined,
  updateTimeInput: undefined,
})

export function useObjectSetup(): { objectSetupForm: Ref<ObjectSetupForm> } {
  const objectSetupForm = ref(createRawObject())
  return { objectSetupForm }
}

export function useAttrSetup(): {
  tableData: Ref<OattModel[]>
  objSize: Ref<number>
  objName: Ref<string>
  pageNum: Ref<number>
  pageSize: Ref<number>
  total: Ref<number>
  pageChanged: (no: number) => void
} {
  const route = useRoute()
  const store = useStore()

  const currentObj: Ref<ObjdModel> = ref({} as ObjdModel)
  const totalTableData: Ref<Array<OattModel>> = ref([])
  const tableDataChunk: Ref<Array<Array<OattModel>>> = ref([])
  const tableData: Ref<Array<OattModel>> = ref([])
  const objSize: Ref<number> = ref(0)
  const objName: Ref<string> = ref('')
  const { pageNum, pageSize, total } = usePagination()

  onMounted(() => {
    currentObj.value = store.state.objd.find(({ objn }: ObjdModel) => objn === route.query.name)
    if (currentObj.value) {
      totalTableData.value = currentObj.value.oatt || []
      tableDataChunk.value = chunk(totalTableData.value, pageSize.value)
      total.value = totalTableData.value.length
      pageChanged(pageNum.value)

      objSize.value = currentObj.value.obsz
      objName.value = currentObj.value.objn
    }
  })

  const pageChanged = (no: number) => {
    pageNum.value = no
    tableData.value = tableDataChunk.value[no - 1]
  }

  return {
    tableData,
    objSize,
    objName,
    pageNum,
    pageSize,
    total,
    pageChanged,
  }
}

export function useAttrDialog(): {
  attrForm: Ref<OattModel>
  attrTypeOptArr: { val: string }[]
  showDecimal: ComputedRef<boolean | ''>
  showReadTime: ComputedRef<boolean | ''>
  addressArr: Ref<Array<AaddModel>>
  initForm: () => OattModel
  createAddressArr: (num: number) => AaddModel[]
} {
  const initForm = (): OattModel => ({
    attn: '',
    attt: '',
    attr: '',
    deci: 0,
    rtim: 0,
    unit: '',
    aadd: [],
  })

  const attrForm: Ref<OattModel> = ref(initForm())
  const attrTypeOptArr = AttributeTypeList
  const addressArr: Ref<Array<AaddModel>> = ref([])
  const showDecimal = computed(() => {
    return attrForm.value.attt && attrForm.value.attt.indexOf('word') !== -1
  })
  const showReadTime = computed(() => {
    return attrForm.value.attr && attrForm.value.attr !== 'W'
  })
  const createAddressArr = (num: number): Array<AaddModel> => {
    const ret = []
    for (let i = 0; i < num; i++) {
      ret.push({
        obix: i,
        desc: '',
        addr: '',
      })
    }
    return ret
  }

  return {
    attrForm,
    attrTypeOptArr,
    showDecimal,
    showReadTime,
    addressArr,
    initForm,
    createAddressArr,
  }
}

export default function useConfig(): {
  tableData: Ref<ObjdModel[]>
  handleEdit: (obj: ObjdModel) => void
  goToAttrPage: (obj: ObjdModel) => void
  delObj: (obj: ObjdModel) => Promise<void>
} {
  const store = useStore()
  const router = useRouter()
  const { t } = useI18n()
  const { deleteObj } = useAPI()
  const tableData = computed(() => {
    const { objd }: { objd: ObjdModel[] } = store.state
    return objd
  })
  const handleEdit = (obj: ObjdModel) => { }
  const goToAttrPage = (obj: ObjdModel) => {
    router.push({
      name: 'AttrSetup',
      query: { name: obj.objn },
    })
  }
  const delObj = async (obj: ObjdModel) => {
    await ElMessageBox.confirm(t('common.confirmDelete'))
    deleteObj(obj.objn)
  }
  return {
    tableData,
    handleEdit,
    goToAttrPage,
    delObj,
  }
}
