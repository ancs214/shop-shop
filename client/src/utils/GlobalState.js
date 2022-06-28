//createContext will create a new container to hold our global state data and functionality so we can use throughout our app
//useContext will allow us to use the state created from the createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

//Every Context object comes with two components, a Provider and Consumer. The Provider is a special type of React component that we wrap our application in so it can make the state data (that's passed into it as a prop) available to all other components. The Consumer is our means of grabbing and using the data that the Provider holds for us.
const StoreContext = createContext();
const { Provider } = StoreContext;