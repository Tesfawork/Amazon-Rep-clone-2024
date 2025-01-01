/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./Product.module.css";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={style.product_container}>
      {products?.map((singleProduct) => (
        <ProductCard
          product={singleProduct}
          key={singleProduct.id}
          renderAdd={true}
        />
      ))}
    </section>
  );
}

export default Product;
