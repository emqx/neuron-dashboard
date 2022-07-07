import { read, utils } from 'xlsx'

export interface SheetItem {
  sheetName: string
  sheet: Array<Record<string, any>>
}

export default () => {
  const fileReader = async (file: File): Promise<Array<SheetItem>> => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      const result: Array<SheetItem> = []
      reader.onload = (event) => {
        const data = event.target?.result
        const wb = read(data, {
          type: 'binary',
        })
        wb.SheetNames.forEach((sheetName) => {
          result.push({
            sheetName,
            sheet: utils.sheet_to_json(wb.Sheets[sheetName]),
          })
        })
        resolve(result)
      }
      reader.readAsBinaryString(file)
    } catch (error) {
      reject(error)
    }
  })

  return {
    fileReader,
  }
}
