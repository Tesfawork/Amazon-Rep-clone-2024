/** @format */

import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import style from "./Header.module.css";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket.length);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={style.fixed}>
      <div className={style.header_container}>
        <div className={style.logo_container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
          {/* delivery */}
          <div className={style.delivery}>
            <span>{<FaLocationDot />}</span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={style.search}>
          {/* search bar */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder=" search product" />
          {<FaSearch size={38} />}
        </div>
        {/* rightSide  */}

        <div>
          <div className={style.order_container}>
            <a href="" className={style.language}>
              <img
                src="https://en.wikipedia.org/wiki/Flag_of_Ethiopia#/media/File:Flag_of_Ethiopia_(Blank).svg"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            {/* three components  */}
            <Link to={!user && "/auth"}>
              <div>
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello , Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
            {/* order */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={style.cart}>
              {<CiShoppingCart size={35} />}
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
};

export default Header;
