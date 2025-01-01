/** @format */

import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";

const LayOut = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

LayOut.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayOut;
