import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu() {
  //retrieve current state from the global state obj and the dispatch() method to update state
  const [state, dispatch] = useStoreContext();

  //we only need categories array so destructure it out of state to use in our returning JSX
  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  //need useEffect hook to take data from useQuery and then use dispatch method to set global state
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };
  


  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

//The CategoryMenu component keeps track of our category list from an Apollo query.