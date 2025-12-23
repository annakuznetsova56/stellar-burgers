import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, getIngredientById, selectCurrentIngredient, selectIngredients } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(selectCurrentIngredient);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    console.log(ingredients);
    console.log(id);
    if(!ingredients || ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if(id) {
      dispatch(getIngredientById(id));
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

export const IngredientPage: FC = () => <IngredientDetails />
