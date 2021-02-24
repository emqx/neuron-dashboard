import XLSX from 'xlsx'

export const getExcelData = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target.result
        const wb = XLSX.read(data, {
          type: 'binary',
        })
        const result = []
        wb.SheetNames.forEach((sheetName) => {
          result.push({
            sheetName: sheetName,
            sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
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

export const exportExcelData = (content) => {
  return new Promise((resolve, reject) => {
    try {
      const ws = XLSX.utils.aoa_to_sheet(content)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
      /* generate file and send to client */
      XLSX.writeFile(wb, 'neuon_export_configuration.xlsx')
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

export default {}
