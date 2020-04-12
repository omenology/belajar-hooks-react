import React, { useEffect, useCallback, useReducer } from "react";
import axios from "axios";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error("Should not get this");
  }
};

const httpStateReducer = (curerntState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curerntState, loading: false };
    case "ERROR":
      return { loading: false, error: action.error };
    case "CLEAR":
      return { ...curerntState, error: null };
    default:
      throw new Error("Should not get this");
  }
};

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttpState] = useReducer(httpStateReducer, { loading: false, error: null });

  useEffect(() => {
    console.log("render ingredients", ingredients);
  }, [ingredients]);

  const filteredIngredients = useCallback(filteredIngredients => {
    //setIngredients(filteredIngredients);
    console.log(filteredIngredients);
    dispatchIngredients({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredients = async ingredient => {
    // setLoading(true);
    dispatchHttpState({ type: "SEND" });
    const { data } = await axios.post("https://belajar-hooks.firebaseio.com/ingredients.json", ingredient);
    // setIngredients(prevData => [...prevData, { id: data.name, ...ingredient }]);
    // setLoading(false);
    dispatchIngredients({ type: "ADD", ingredient: { id: data.name, ...ingredient } });
    dispatchHttpState({ type: "RESPONSE" });
  };

  const removeIngredients = async id => {
    // setLoading(true);
    dispatchHttpState({ type: "SEND" });
    try {
      await axios.delete(`https://belajar-hooks.firebaseio.com/ingredients/${id}.json`);
      // setIngredients(prevData => prevData.filter(ingredient => ingredient.id !== id));
      // setLoading(false);
      dispatchIngredients({ type: "DELETE", id: id });
      dispatchHttpState({ type: "RESPONSE" });
    } catch (err) {
      // console.log(err.message);
      // setError(err.message);
      // setLoading(false);
      dispatchHttpState({ type: "ERROR", error: err.message });
      dispatchHttpState({ type: "RESPONSE" });
    }
  };

  const clearError = () => {
    //setError(null);
    dispatchHttpState({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal clearError={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm loading={httpState.loading} addIngredients={addIngredients} />

      <section>
        <Search httpStateHandler={dispatchHttpState} onLoadIngredients={filteredIngredients} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
