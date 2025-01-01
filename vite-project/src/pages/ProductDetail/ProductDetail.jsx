/** @format */
// import style from "./ProductDetail.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/EndPoints";
import ProductCard from "../../components/Product/ProductCard";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(product);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res.data); // Log API response
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <LayOut>
        <p>Loading product details...</p>
      </LayOut>
    );
  }

  if (error) {
    return (
      <LayOut>
        <p>Error: Product not found.</p>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <h1>Product Detail</h1>
      <ProductCard
        product={product}
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />
    </LayOut>
  );
}

export default ProductDetail;
