import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Link from "next/link";

function Header() {
  let { isLoggedIn } = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <header className="nav">
      <h1> Memo</h1>

      {!isLoggedIn ? (
        <div className="menu">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div className="menu">
          <Link href="/login">
            <span
              onClick={() => {
                dispatch({ type: "SET_LOGIN", payload: false });
                localStorage.removeItem("profile");
              }}
            >
              Logout
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
