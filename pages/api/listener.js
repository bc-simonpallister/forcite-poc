import { getOrder, setOrderStatus } from "../../lib/orders"

async function handler(req, res) {

  const { id } = req.body.data

  let order = await getOrder(id)

  const item = order.products.line_items.find(item=>item.name.includes('Pre-Order'))

  if(item){
    order = await setOrderStatus(order.id, 7)
    res.status(200).json({order})
    return
  }

  const balance = order.products.line_items.find(item=>item.name.includes('Balance'))

  if(balance){
    const related_order = balance.product_options[0].display_value
    order = await setOrderStatus(related_order, 11)
  }

  res.status(200).json({order})
}

export default handler