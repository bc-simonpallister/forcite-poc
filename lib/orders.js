export const getAllOrders = async () => {
  const data = await fetch(`${process.env.API_URL}/v2/orders`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': process.env.AUTH_TOKEN
      }
    }
  )


  const json = await data.json()

  const completeData = await Promise.all(json.map(async (order) => {
    const productJson = await getProducts(order)
    order.products.line_items = productJson
    return order
  }))

  return completeData
}


const getProducts = async (order) => {
  const data = await fetch(`${order.products.url}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': process.env.AUTH_TOKEN
      }
    }
  )
  const productJson = await data.json()

  return productJson
}
export const getOrder = async (id) => {
  const data = await fetch(`${process.env.API_URL}/v2/orders/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': process.env.AUTH_TOKEN
      }
    }
  )
  const json = await data.json()
  const productJson = await getProducts(json)
  json.products.line_items = productJson
  
  return json

}

export const setOrderStatus = async (id, status_id) => {
  
  const body = {
    status_id
  }

  const data = await fetch(`${process.env.API_URL}/v2/orders/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': process.env.AUTH_TOKEN
      },
      body : JSON.stringify(body),
      method: 'PUT'
    }
  )
  const json = await data.json()
  // console.log(json)
  // const productJson = await getProducts(json)
  // json.products.line_items = productJson
  
  return json

}