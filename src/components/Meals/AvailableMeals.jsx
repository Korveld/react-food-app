import classes from './AvailableMeals.module.scss'
import Card from "../UI/Card.jsx";
import MealItem from "./MealItem/MealItem.jsx";
import {useEffect, useState} from "react";
import axios from 'axios'

const AvailableMeals = () => {
  const [meals, setMeals] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_FIREBASE_URL_MEALS}`);
        const responseData = await response.data

        const loadedMeals = []

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          })
        }

        setMeals(loadedMeals)
        setIsLoading(false)
      } catch (error) {
        console.log(Object.keys(error), error.message)
      }
    }

    fetchMeals()
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        <ul>{meals && !isLoading && meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals