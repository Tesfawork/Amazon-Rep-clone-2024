/** @format */

// /** @format */
// import { useContext, useState } from "react";
// import LayOut from "../../components/LayOut/LayOut";
// import style from "./payment.module.css";
// import { DataContext } from "../../components/DataProvider/DataProvider";
// import ProductCard from "../../components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// // import { colors } from "@mui/material";
// import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../Api/axios";
// import { BeatLoader } from "react-spinners";
// import { db } from "../../Utility/firebase";
// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   console.log(user);

//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0);
//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);

//   const [processing, setProcessing] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // console.log(e);
//     e.error?.message ? setCardError(e?.error.message) : setCardError("");
//   };
//   const handlepayment = async (e) => {
//     e.preventDefault();

//     try {
//       setProcessing(true);
//       //1. backend || functions--->contact to the client secret
//       const response = await axiosInstance({
//         method: "post",
//         url: `/payment/create?total=${total * 100}`,
//       });
//       // console.log(response.data)
//       const clientSecret = response.data?.clientSecret;
//       //2. client side(react side confirmation)
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
//       // console.log(paymentIntent);
//       //3. after the confirmation -->order firestore database save,clear basket
//       await db
//         .collection("user")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id);
//       set({
//         basket: basket,
//         amount: paymentIntent.amount,
//         created: paymentIntent.created,
//       });
//       //empty the basket
//       dispatch({ type: Type.EMPTY_BASKET });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "you have placed new order" } });
//     } catch (error) {
//       console.log(error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       {/* header  */}
//       <div className={style.payment_header}>checkout ({totalItem}) items</div>
//       {/* method  */}
//       <section className={style.payment}>
//         {/* address  */}
//         <div className={style.flex}>
//           <h3>delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 REEE </div>
//             <div> KSA</div>
//           </div>
//         </div>
//         <hr />
//         {/* product  */}
//         <div className={style.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard product={item} key={item} flex={true} />
//             ))}
//           </div>
//         </div>

//         <hr />

//         {/* card form  */}
//         <div className={style.flex}>
//           <h3>payment methods</h3>
//           <div className={style.payment_card_container}>
//             <div className={style.payment__details}>
//               <form onSubmit={handlepayment}>
//                 {cardError && (
//                   <small style={{ color: "red" }}> {cardError} </small>
//                 )}
//                 <CardElement onChange={handleChange} />
//                 {/* price  */}
//                 <div className={style.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p> <CurrencyFormat amount={total} />{" "}
//                     </span>
//                   </div>
//                   <button type="submit">
//                     {processing ? (
//                       <div className={style.loading}>
//                         <BeatLoader color="gray" size={12} />
//                         <p>please wait...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

//REVIEW -
/** @format */
import { useContext, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import style from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Api/axios";
import { BeatLoader } from "react-spinners";
import { db } from "../../Utility/firebase";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Backend call to create a client secret
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      // Stripe payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Save order in Firestore
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order." } });
    } catch (error) {
      console.error("Payment Error:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={style.payment_header}>Checkout ({totalItem}) items</div>

      {/* Payment Section */}
      <section className={style.payment}>
        {/* Delivery Address */}
        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 REEE</div>
            <div>Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* Product Review */}
        <div className={style.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} key={item.id} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Method */}
        <div className={style.flex}>
          <h3>Payment Method</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={style.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={style.loading}>
                        <BeatLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
