export const createCart = async (order) => {

  const balance = order.subtotal_inc_tax - order.total_inc_tax

  const body = {
    customer_id: order.customer_id,
    line_items : [{
      quantity: 1,
      product_id: 121,
      list_price : balance,
      option_selections: [
        {
          option_id: 144,
          option_value: order.id
        }
      ]
    }]
  }

  const data = await fetch(`${process.env.API_URL}/v3/carts?include=redirect_urls`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': process.env.AUTH_TOKEN
        },
      body : JSON.stringify(body),
      method: 'POST'
    }
  )

  const cart = await data.json()

  const { billing_address } = order

  billing_address.address1 = billing_address.street_1
  billing_address.address2 = billing_address.street_2
  billing_address.country_code = billing_address.country_iso2
  billing_address.state_or_province = billing_address.state
  billing_address.postal_code = billing_address.zip

  const billingCheckoutData = await fetch(`${process.env.API_URL}/v3/checkouts/${cart.data.id}/billing-address`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': process.env.AUTH_TOKEN
        },
      body : JSON.stringify(billing_address),
      method: 'POST'
    }
  )

  const billingCheckout = await billingCheckoutData.json()
  
  const checkoutData = await fetch(`${process.env.API_URL}/v3/carts/${cart.data.id}/redirect_urls`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': process.env.AUTH_TOKEN
        },
      body : JSON.stringify(body),
      method: 'POST'
    }
  )

  const cart_urls = await checkoutData.json()

  return cart_urls

}
