import http from '@/utils/http'

export const postData = (nodeID, body) => {
  return http.post(`/neuron/${nodeID}/api/v1/funcno${body.func}`, JSON.stringify(body))
}

export const getData = (nodeID, body) => {
  return http.put(`/neuron/${nodeID}/api/v1/funcno${body.func}`, JSON.stringify(body))
}

export const deleteData = (nodeID, body) => {
  return http.put(`/neuron/${nodeID}/api/v1/funcno${body.func}`, JSON.stringify(body))
}

export default {}
