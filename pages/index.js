import Head from 'next/head'
import Image from 'next/image'
import { getAllOrders } from '../lib/orders'
import Order from '../components/Order'

export default function Home({orders}) {

  //(orders)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Forcite Helmets POC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-primary w-full text-center py-2">
        <Image src="/forcite-logo.png" width="214" height="154" className="p-5 flex-none"/>
      </header>
      <main className="flex flex-col w-full flex-1 px-20 text-center bg-primary text-white">
        <h1 className="text-8xl font-bold my-10 italic">
          FORCITE HELMETS POC
        </h1>

        <h2 className="text-left my-5 italic font-bold">Outstanding Balances</h2>

        <div className="flex flex-row flex-wrap flex-initial">
          {orders.filter(o=>o.status_id === 7).map(order => (
            <Order key={order.id}order={order} />
          ))}
        </div>

        
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://bigcommerce.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/BigCommerce-logo-dark.svg" alt="BigCommerce Logo" className="h-4 ml-2" width="200" height="100" />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(ctx){

  const orders = await getAllOrders()

  //console.log(orders)

  return {
    props:{
      orders
    }
  }
}
