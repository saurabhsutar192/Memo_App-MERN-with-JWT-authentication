import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/auth.module.css";
import { registerUser } from "./api/api";

function register() {
  let router = useRouter();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [verifyPass, setVerifyPass] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (user.name && user.email && user.password) {
      if (user.password === verifyPass) {
        registerUser(user)
          .then(() => {
            router.push("/login");
            setUser({
              name: "",
              email: "",
              password: "",
            });
            setVerifyPass("");
          })
          .catch(({ response }) => {
            window.alert(response.data.message);
          });
      } else {
        window.alert("Passwords Do Not Match!");
      }
    } else {
      window.alert("Enter all details!");
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.auth}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={user.name}
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Name"
          autoComplete="new-password"
        />
        <input
          value={user.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="E-mail"
          autoComplete="new-password"
        />
        <input
          value={user.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <input
          value={verifyPass}
          onChange={(e) => {
            setVerifyPass(e.target.value);
          }}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default register;
