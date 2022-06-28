import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

function Detail() {
  //retrieve current state from the global state obj and the dispatch() method to update state
  const [state, dispatch] = useStoreContext();
  //destructure useParams to get id
  const { id } = useParams();
  //still need useState in case we dont have any products in our global state obj yet 
  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //destructure state to use products
  const { products } = state;
  //useEffect checks two things: 1. if there is product data returned from useQuery hook 2. if data is in our global state's product array 
  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);


  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
