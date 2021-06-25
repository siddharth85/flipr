import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
    } else {
      login({
        email,
        password,
      });
    }
  };

  const LoginForm = {
    maxWidth: "500px",
    padding: "15px",
    margin: "auto",
    marginTop: "50px",
  };

  return (
    <div style={LoginForm}>
      <h1 style={{ textAlign: "center" }}>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            class="form-control"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" value="Register">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
