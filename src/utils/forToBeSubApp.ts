export const isSubApp = window.__POWERED_BY_QIANKUN__

export function replacePath(
  path: string,
  version: string,
  orgId: string,
  projectId: string,
  serviceId: string,
): string {
  const pathArray = path.split('/')
  pathArray[2] = version
  pathArray[4] = orgId
  pathArray[5] = projectId
  pathArray[6] = serviceId
  return pathArray.join('/')
}
