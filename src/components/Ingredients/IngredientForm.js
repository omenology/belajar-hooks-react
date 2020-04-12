import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submitHandler = event => {
    event.preventDefault();
    props.addIngredients({ title: title, amount: amount });
  };

  useEffect(() => {
    console.log("render form");
  });

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              onChange={event => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={event => {
                setAmount(event.target.value);
              }}
              value={amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
