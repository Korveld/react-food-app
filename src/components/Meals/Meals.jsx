import MealsSummary from "./MealsSummary.jsx";
import AvailableMeals from "./AvailableMeals.jsx";
// import AvailableMealsFirestore from "./AvailableMealsFirestore.jsx";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
      {/*<AvailableMealsFirestore />*/}
    </>
  )
}

export default Meals