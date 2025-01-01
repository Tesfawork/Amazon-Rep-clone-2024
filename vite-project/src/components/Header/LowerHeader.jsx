import style from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";

function LowerHeader() {
  return (
    <div className={style.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>

        <li>Todays Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
