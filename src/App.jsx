import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals.jsx";
import Cart from "./components/Cart/Cart.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import CartContext from "./store/cart-context.jsx";

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false)
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const isInitialMount = useRef(true);

  useEffect(() => {
    if ( localStorage.getItem('cart') ) {
      // console.log('added to store')
      cartCtx.addStorage()
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (items.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(cartCtx));
      }
    }
  }, [items]);

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </>
  )
}

export default App
