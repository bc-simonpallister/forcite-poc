import { getOrder } from "../../lib/orders"
import { createCart } from "../../lib/cart"

async function handler(req, res) {

  const { id } = req.query

  const order = await getOrder(id)

  const cart = await createCart(order)

  res.status(200).json({cart})
}

export default handler