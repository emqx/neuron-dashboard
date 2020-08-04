import XLSX from 'xlsx'

const getExcelData = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target.result
        const wb = XLSX.read(data, {
          type: 'binary'
        })
        const result = []
        wb.SheetNames.forEach((sheetName) => {
          result.push({
            sheetName: sheetName,
            sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
          })
        })
        resolve(result)
      }
      reader.readAsBinaryString(file.raw)
    } catch (error) {
      reject(error)
    }
  })
}

export default getExcelData
