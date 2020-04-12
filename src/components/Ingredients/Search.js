import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (keyword === inputRef.current.value) {
        //props.loadingHandler(true)
        props.httpStateHandler({ type: "SEND" });
        try {
          const query = keyword.length === 0 ? "" : `?orderBy="title"&equalTo="${keyword}"`;
          const { data } = await axios("https://belajar-hooks.firebaseio.com/ingredients.json" + query);

          const ingredients = [];
          for (const id in data) {
            ingredients.push({ id: id, ...data[id] });
          }

          onLoadIngredients(ingredients);
          props.httpStateHandler({ type: "RESPONSE" });
        } catch (err) {
          props.httpStateHandler({ type: "RESPONSE" });
          props.httpStateHandler({ type: "ERROR", error: err.message });
          //props.errorHandler(err.message);
        }
      }

      return () => {
        clearTimeout(timer);
      };
    }, 500);
  }, [keyword, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" onChange={event => setKeyword(event.target.value)} value={keyword} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
