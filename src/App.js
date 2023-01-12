import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  // the 'cart' of state.cart comes from sotre.js cause we named that thing 'cart' in out store
  // so basically state is store and it has all the reducers that we named in store,js
  // const { cartItems, isLoading } = useSelector((state) => state.cart);
  // const { isOpen } = useSelector((state) => state.modal);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(calculateTotal());
  // }, [cartItems]);

  /**
      React components automatically update when their state or props change. In this code, the App component is rendered 
      initially with isLoading as its state. If isLoading is true, then the component will render the loading message. 
      When the data becomes available and the isLoading state changes to false, the component will re-render and execute 
      the code inside the return statement, which will show the data.

      This happens because the App component is using the useSelector hook to get the isLoading state from the redux store. 
      The useSelector hook is a function that allows the component to subscribe to the redux store and get the current state. 
      Whenever the state in the store changes, the component will re-render and use the updated state.

      You can learn more about the useSelector hook and how it works in the React-Redux documentation:

      https://react-redux.js.org/api/hooks#useselector
      https://react-redux.js.org/api/hooks#how-does-it-work
  //  */
  // useEffect(() => {
  //   dispatch(getCartItems("random"));
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="loading">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <main>
      {/* note: isOpen is bool var, not a function hence no parenthesis */}
      {/* {isOpen && <Modal />} */}
      {/* <Navbar /> */}
      {/* <CartContainer /> */}
      <Fetch></Fetch>
    </main>
  );
}

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const response = await fetch("https://api.github.com/users");
    const users = await response.json();
    setUsers(users);
    setLoading(false);
    console.log("hi mom")
    // console.log(users);
  };
  
  useEffect(() => {
    getUsers();
    console.log('effect')
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h3>github users</h3>
      <ul className="users">
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
