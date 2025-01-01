// import {createContext, useReducer} from "react";

// export const DataContext = createContext();

// export const DataProvider = ({children, reducer,initialState}) =>{
//     return (
//         <DataContext.Provider value={useReducer(reducer, initialState)}>
//             {children}
//         </DataContext.Provider>
//     )
// }

import { createContext, useReducer } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create a Context
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

// DataProvider component with PropTypes for type-checking
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

// Define the prop types for DataProvider
DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Expect children to be renderable React nodes
  reducer: PropTypes.func.isRequired, // Expect reducer to be a function
  initialState: PropTypes.object.isRequired, // Expect initialState to be an object (can be adjusted based on actual shape)
};
