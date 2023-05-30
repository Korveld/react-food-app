import classes from './AvailableMeals.module.scss'
import Card from "../UI/Card.jsx";
import MealItem from "./MealItem/MealItem.jsx";
import {useEffect, useState} from "react";

import { collection, getDocs } from "firebase/firestore";
import {db} from '../../utils/firebase.js';

const AvailableMealsFirestore = () => {
  const [meals, setMeals] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    const fetchPost = async () => {
      await getDocs(collection(db, "meals"))
        .then(querySnapshot=> {
          const newData = querySnapshot.docs
            .map(doc => ({
              ...doc.data(),
              id:doc.id
            }))
          if (newData.length > 0) {
            setHttpError('')
            setMeals(newData)
            console.log(newData);
          } else {
            setHttpError('Something goes wrong!')
          }
          setIsLoading(false)
        })
    }

    fetchPost();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className={classes['text-center']}>Loading...</p>}
        {httpError !== '' && (
          <p className={`${classes['http-error']} ${classes['text-center']}`}>{httpError}</p>
        )}
        <ul>{meals && !isLoading && httpError === '' && meals.map((meal) => (
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

export default AvailableMealsFirestore