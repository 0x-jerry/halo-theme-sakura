export default defineEventHandler((event) => {
  const params = getRouterParams(event)
  const query = getQuery(event)
  const body = readBody(event)

  return {
    params,
    query,
    body,
  }
})