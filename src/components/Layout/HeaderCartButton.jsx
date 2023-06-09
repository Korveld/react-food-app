import classes from './HeaderCartButton.module.scss'
import CartIcon from "../Cart/CartIcon.jsx";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context.jsx";
import PropTypes from "prop-types";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`



  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
}

HeaderCartButton.propTypes = {
  onShowCart: PropTypes.any,
}

export default HeaderCartButton