import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientById, selectCurrentIngredient, selectIngredients } from '../../slices/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(selectCurrentIngredient);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (id && ingredients && ingredients.length > 0) {
      dispatch(getIngredientById(id));
    }
  }, [dispatch, id, ingredients]); 

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
