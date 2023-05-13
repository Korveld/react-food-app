import ReactDOM from "react-dom";

import classes from './Modal.module.scss'

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideCart}></div>
}

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        document.body
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          {props.children}
        </ModalOverlay>,
        document.body
      )}
    </>
  )
}

export default Modal