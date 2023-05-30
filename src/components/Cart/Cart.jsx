import classes from './Cart.module.scss'
import Modal from "../UI/Modal.jsx";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context.jsx";
import CartItem from "./CartItem.jsx";
import Checkout from "./Checkout.jsx";
import axios from "axios";
import PropTypes from "prop-types";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1
    })
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    /*await axios.post(`${import.meta.env.VITE_FIREBASE_URL_ORDERS}`, {
      user: userData,
      orderedItems: cartCtx.items
    })*/
    await axios.all([
      axios.post(`${import.meta.env.VITE_FIREBASE_URL_ORDERS}`, {
        user: userData,
        orderedItems: cartCtx.items
      })
    ])
      .then(axios.spread(() => {
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
      }))
      .catch(error => {
        console.log(error.message)
      })
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={props.onHideCart}
      >
        Close
      </button>
      {hasItems && <button
        className={classes.button}
        onClick={orderHandler}
      >
        Order
      </button>}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout
        onCancel={props.onHideCart}
        onConfirm={submitOrderHandler}
      />}
      {!isCheckout && modalActions}
    </>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={props.onHideCart}
        >
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

Cart.propTypes = {
  onHideCart: PropTypes.any,
}

export default Cart