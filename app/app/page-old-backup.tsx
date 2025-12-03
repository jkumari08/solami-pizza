'use client'; // this makes next know that this page should be rendered in the client
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PayQR from '@/src/components/PayQR';
import { MenuComponent } from '@/src/components/MenuComponent';
import { LoyaltyPoints } from '@/src/components/LoyaltyPoints';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { Keypair, PublicKey } from '@solana/web3.js';
import { findReference, FindReferenceError } from '@solana/pay';
import { PizzaOrder, displayOnChainPizzaOrder, getOrderPublicKey } from '@/src/util/order';
import { CONNECTION } from '@/src/util/const';
import { saveOrder, Order, updateStock, addLoyaltyPoints } from '@/src/util/inventory';


type PizzaOrderType = {
  pepperoni: number,
  mushrooms: number,
  olives: number,
}

export default function Home() {
  const { cart, clearCart } = useCart();
  const [pizzaOrder, setPizzaOrder] = useState<PizzaOrderType>()
  const [total, setTotal] = useState(0);
  const [reference, setReference] = useState<PublicKey>();
  const [orderNumber, setOrderNumber] = useState<number>();

  const [orderPublicKey, setOrderPublicKey] = useState<PublicKey>();
  const [onChainOrderDetails, setOnChainOrderDetails] = useState<PizzaOrder>();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Initialize checkout from cart
  const initializeCheckout = () => {
    if (cart.length === 0) return;

    const pepperoni = cart.find(c => c.menuItemId === 'pepperoni')?.quantity || 0;
    const mushrooms = cart.find(c => c.menuItemId === 'mushrooms')?.quantity || 0;
    const olives = cart.find(c => c.menuItemId === 'olives')?.quantity || 0;

    setPizzaOrder({ pepperoni, mushrooms, olives });
    setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    setIsCheckingOut(true);
  };

  useEffect(() => {
    if (isCheckingOut) {
      setReference(Keypair.generate().publicKey);
      const randomOrderNumber = Math.floor(Math.random() * 255);
      setOrderNumber(randomOrderNumber);
    }
  }, [isCheckingOut]);

  useEffect(() => {
    if (isCheckingOut && pizzaOrder) {
      const newPizzaOrder = new PizzaOrder({
        order: orderNumber || 0,
        pepperoni: pizzaOrder.pepperoni,
        mushrooms: pizzaOrder.mushrooms,
        olives: pizzaOrder.olives,
      });
      const oldPizzaOrder = pizzaOrder;
      setPizzaOrder(oldPizzaOrder);
    }
  }, [orderNumber, isCheckingOut, pizzaOrder]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        if (reference && orderNumber && pizzaOrder) {
          const signatureInfo = await findReference(CONNECTION, reference);
          // do something here when the transaction is confirmed
          console.log('Transaction confirmed', signatureInfo);
          const parsedSender = (
            await CONNECTION.getParsedTransaction(signatureInfo.signature)
          )?.transaction.message.accountKeys.filter((key) => key.signer)[0];
          if (parsedSender) {
            const orderPublicKey = getOrderPublicKey(
              orderNumber,
              parsedSender.pubkey
            );
            setOrderPublicKey(orderPublicKey);
            const details = await displayOnChainPizzaOrder(orderPublicKey);
            setOnChainOrderDetails(details);

            // Save order to history
            const newOrder: Order = {
              id: reference.toBase58(),
              timestamp: Date.now(),
              items: cart,
              total,
              status: 'confirmed',
              reference: reference.toBase58(),
              signature: signatureInfo.signature,
              orderPublicKey: orderPublicKey.toBase58(),
            };
            saveOrder(newOrder);

            // Update inventory
            cart.forEach(item => {
              updateStock(item.menuItemId, item.quantity);
            });

            // Add loyalty points (1 point per euro spent)
            const pointsEarned = Math.round(total);
            addLoyaltyPoints(pointsEarned);

            clearCart();
          }
        }
      } catch (e) {
        if (e instanceof FindReferenceError) {
          console.log('No transaction found for the reference');
          return;
        }
        console.error('Unknown error', e);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [orderNumber, orderPublicKey, reference, pizzaOrder, cart, clearCart, total]);

  if (onChainOrderDetails && pizzaOrder) {
    return (
      <main className='min-h-screen bg-red-500 p-2'>
        <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-[url('../public/pizzeria.jpg')]">
          <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-red-900 bg-opacity-60 pt-4">
            <div className='bg-white shadow-md rounded-2xl border-solid border border-black mx-auto w-fit p-2'>
              <div className='text-center px-3 pb-6 pt-2'>
                <h2 className='my-8 text-2xl'>
                  Confirmed!{' '}
                </h2>
                <p className='text-sm text-gray-700 my-4'>
                  Your Order :
                </p>
                <div className='text-center mx-auto w-96'>
                  <ul className='text-sm text-gray-600'>
                    <li className='my-2 flex flex-row justify-center mx-16 text-lg'>
                      <p className='font-bold'>Pepperoni</p>
                      <p className='font-bold ml-auto text-red-600'>{onChainOrderDetails.pepperoni}</p>
                    </li>
                    <li className='my-2 flex flex-row justify-left mx-16 text-lg'>
                      <p className='font-bold'>Mushrooms</p>
                      <p className='font-bold ml-auto text-red-600'>{onChainOrderDetails.mushrooms}</p>
                    </li>
                    <li className='my-2 flex flex-row justify-left mx-16 text-lg'>
                      <p className='font-bold'>Olives</p>
                      <p className='font-bold ml-auto text-red-600'>{onChainOrderDetails.olives}</p>
                    </li>
                  </ul>
                </div>
                <p className='text-sm text-gray-700 mt-6 mx-auto'>
                  On-Chain Address :
                </p>
                <p className='text-sm mt-2 mx-auto'>
                  <a
                    className='underline text-blue-600'
                    target='_blank' 
                    rel='noopener noreferrer' 
                    href={`https://explorer.solana.com/address/${orderPublicKey?.toBase58()}/anchor-account?cluster=devnet`}>{orderPublicKey?.toBase58()}</a>
                </p>
                <Link href='/' className='mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg'>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isCheckingOut && pizzaOrder && total !== 0 && reference && orderNumber) {
    return (
      <main className='min-h-screen bg-red-500 p-2'>
        <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-[url('../public/pizzeria.jpg')]">
          <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-red-900 bg-opacity-60 pt-4">
            <div className='flex flex-col justify-center items-center gap-4'>
              <button
                onClick={() => setIsCheckingOut(false)}
                className='bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg'
              >
                Back to Menu
              </button>
              <PayQR
                reference={reference}
                total={total}
                order={orderNumber}
                pepperoni={pizzaOrder.pepperoni}
                mushrooms={pizzaOrder.mushrooms}
                olives={pizzaOrder.olives}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-red-500 p-2'>
      <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-[url('../public/pizzeria.jpg')]">
        <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-red-900 bg-opacity-60 pt-4">
          <div className='mb-4 px-4'>
            <LoyaltyPoints />
          </div>
          <MenuComponent onCheckout={initializeCheckout} />
        </div>
      </div>
    </main>
  );
}
