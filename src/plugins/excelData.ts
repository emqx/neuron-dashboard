import XLSX from 'xlsx'

type ParsedTableData = Array<{
  sheetName: string
  sheet: Array<unknown>
}>

const parseFileDataToArray = (data: ArrayBuffer): ParsedTableData => {
  const ret: ParsedTableData = []
  const rawTableData = XLSX.read(data, { type: 'binary' })
  rawTableData.SheetNames.forEach((sheetName) => {
    ret.push({
      sheetName,
      sheet: XLSX.utils.sheet_to_json(rawTableData.Sheets[sheetName]),
    })
  })
  return ret
}

export const handleExcelFile = (file: { raw: Blob }): Promise<ParsedTableData> => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = event.target?.result
      if (data) {
        resolve(parseFileDataToArray(data as ArrayBuffer))
      }
      reject()
    }
    reader.readAsBinaryString(file.raw)
  } catch (error) {
    reject(error)
  }
})

export const createExcelFileFromTableData = (content: Array<Array<unknown>>): Promise<boolean | Error> => new Promise((resolve, reject) => {
  try {
    const workSheet = XLSX.utils.aoa_to_sheet(content)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetJS')
    XLSX.writeFile(workBook, 'neuron_export_configuration.xlsx')
    resolve(true)
  } catch (error) {
    reject(error)
  }
})
