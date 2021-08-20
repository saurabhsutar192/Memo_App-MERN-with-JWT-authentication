import { useState, useEffect } from "react";
import styles from "../styles/auth.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "./api/api";

function login() {
  let dispatch = useDispatch();
  let router = useRouter();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (user.email && user.password) {
      loginUser(user)
        .then(({ data }) => {
          localStorage.setItem(
            "profile",
            JSON.stringify({
              name: data.result.name,
              id: data.result._id,
              token: data.token,
            })
          );
          dispatch({ type: "SET_LOGIN", payload: true });
          router.push("/");
        })
        .catch(({ response }) => {
          window.alert(response.data.message);
        });
    } else {
      window.alert("Enter all details!");
    }
  }

  return (
    <div className={styles.auth}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          type="email"
          placeholder="E-mail"
          autoComplete="new-password"
        />
        <input
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          type="password"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default login;
