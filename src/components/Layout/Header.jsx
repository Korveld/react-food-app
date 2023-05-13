import classes from './Header.module.scss'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton.jsx";

const Header = props => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!"/>
      </div>
    </>
  )
}

export default Header