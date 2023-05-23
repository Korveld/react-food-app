import classes from './AvailableMeals.module.scss'
import Card from "../UI/Card.jsx";
import MealItem from "./MealItem/MealItem.jsx";
import {useEffect, useState} from "react";
import axios from 'axios'

/*import { collection, getDocs } from "firebase/firestore";
import {db} from '../../utils/firebase.js';*/

const AvailableMeals = () => {
  const [meals, setMeals] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState()

  /*useEffect(() => {
    const fetchPost = async () => {
      await getDocs(collection(db, "meals"))
        .then((querySnapshot)=> {
          const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
          setMeals(newData);
          console.log(newData);
        })
    }

    fetchPost();
  }, []);*/

  useEffect(() => {
    setIsLoading(true)
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_FIREBASE_URL_MEALS}`);
        // const response = await axios.get('https://react-food-order-app-a7c1a-default-rtdb.europe-west1.firebasedatabase.app/meals');
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
        setIsLoading(false)
        setHttpError(error.message)
      }
    }

    fetchMeals()
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className={classes['text-center']}>Loading...</p>}
        {httpError && (
          <p className={`${classes['http-error']} ${classes['text-center']}`}>{httpError}</p>
        )}
        <ul>{meals && !isLoading && !httpError && meals.map((meal) => (
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