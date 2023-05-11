import classes from './Header.module.scss'
import mealsImage from '../../assets/meals.jpg'

const Header = props => {
  return (
    <>
      <header>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div>
        <img src={mealsImage} alt=""/>
      </div>
    </>
  )
}

export default Header