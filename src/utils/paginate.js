const paginate = (data, pageSize, pageNumber) => {
  return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export default paginate
