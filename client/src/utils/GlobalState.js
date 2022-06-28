//createContext will create a new container to hold our global state data and functionality so we can use throughout our app
//useContext will allow us to use the state created from the createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

//Every Context object comes with two components, a Provider and Consumer. The Provider is a special type of React component that we wrap our application in so it can make the state data (that's passed into it as a prop) available to all other components. The Consumer is our means of grabbing and using the data that the Provider holds for us.
const StoreContext = createContext();
const { Provider } = StoreContext;

//instantiate our initial global state with useProductReducer() we created. it will return state as the most up to date version of our global state obj and dispatch as the method we use to update our state
//then return StoreContext's provider component with our state obj and dispatch as data for the value prop
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
      products: [],
      categories: [],
      currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  //Our own custom React hook! When we execute this function from within a component, we will receive the [state, dispatch] data our StoreProvider provider manages for us. This means that any component that has access to our StoreProvider component can use any data in our global state container or update it using the dispatch function.
  const useStoreContext = () => {
    return useContext(StoreContext);
  };

  export { StoreProvider, useStoreContext };