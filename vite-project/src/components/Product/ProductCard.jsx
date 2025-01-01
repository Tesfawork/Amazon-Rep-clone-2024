/** @format */

import Rating from "@mui/material/rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import style from "./Product.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  // if (!product) {
  //   return <p>Loading product...</p>; // Render a fallback UI
  // }
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div className={`${style.Card_container}  ${style.product_fixed}`}>
      <Link to={`/products/${id}`}>
        <img src={image || "https://via.placeholder.com/150"} alt={title} />
        <button className={style.detail}>View Product</button>
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={style.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price || 0} />
        </div>
        <button className={style.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductCard;
