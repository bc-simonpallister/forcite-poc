import { useState } from "react"

function Order({order}) {

  const [checkout_url, setCheckout_url] = useState()

  const handleClick = async  (e) => {

    setCheckout_url("")

    const { orderId } = e.target.dataset

    const data = await fetch(`/api/checkout?id=${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        }
      }
    )
    const json = await data.json()
  
    const { checkout_url } = json.cart.data

    console.log(checkout_url)
    setCheckout_url(checkout_url)

  }

  const checkout_link = () => {
    if (checkout_url){
      return (
        <div className="my-5">
          <a href={checkout_url} title={checkout_url} target="_blank" >Checkout URL</a>
        </div>
      )
    } 
  }


  return (
    <div className="flex-auto border rounded-xl max-w-md p-5 m-2 text-left">
    <div className="text-lg font-bold">Order {order.id}</div>
    <div className="flex flex-col">
      <div>{order.billing_address.email}</div>
      {order.products.line_items.map((item, index) => (
        <div key={index}>
          <div>
            {item.name} - ${item.base_total}
          </div>
        </div>
      ))}
      <div>Total Paid ${order.total_inc_tax}</div>
      <div>Balance Owed ${order.subtotal_inc_tax - order.total_inc_tax}</div>
      <button data-order-id={order.id} onClick={handleClick} className="p-3 border my-2">Send Payment Request</button>
      <div>
        {checkout_link()}
      </div>
    </div>
    
  </div>

  );
}

export default Order;