import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  // use selector accepts a function whose args has access to entire store
  // so we accseed store and return the cart from our store
  // now cart is object so we destructure and take out amount from it
  const { amount } = useSelector((state) => state.cart);

  // so we can access entire store with just useSelector()
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
