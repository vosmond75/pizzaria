// importing google font for NextJS
import { getJSONData } from '@/tools/Toolkit';
import { Griffy } from 'next/font/google';
const griffy = Griffy({ weight: "400", subsets: ['latin'] });
import { useState } from "react";
import LoadingOverlay from '@/components/LoadingOverlay';
import OrderData from '@/components/OrderData';
import { Order, Orders } from "@/tools/orders.model";
import React from 'react';

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT: string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";
  const [orders, setOrders] = useState<Orders>();
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  //------------------------------------------event handlers
  const onResponse = (data: Orders) => {
    console.log(data);
    setOrders(data);
    setEnableLoader(false);
  };

  const onError = (message: string) => {
    console.log(`***Error retrieving pizza order data :( | ${message}`);
    setEnableLoader(false);
  };

  const getOrders = (e: any) => {
    console.log("get orders");
    setEnableLoader(true);
    // fetch the data from the api
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  };

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">
      <LoadingOverlay enabled={enableLoader} bgColor="blue" showSpinner={showSpinner} spinnerColor="white" />
      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
            <button
              className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5" onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        <div id="output" className="divide-dashed divide-y-2 divide-accent">

          {(orders?.orders.length) ?
            <>
              {orders.orders.map(
                (order: Order, i: number) =>
                  <OrderData order={order} />
              )}
            </> :
            <>
              No orders retrieved...
            </>
          }
        </div>
      </div>
    </main>
  );
}