/** @format */

import LayOut from "../../components/LayOut/LayOut";
import style from "./Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoints";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(categoryName);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />

        <div className={style.product_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
