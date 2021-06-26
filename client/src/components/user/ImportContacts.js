import React, { useState } from "react";
import { Link } from "react-router-dom";

function ImportContacts() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const Form = {
    maxWidth: "500px",
    padding: "15px",
    margin: "auto",
    marginTop: "50px",
  };

  return (
    <>
      <form style={Form}>
        <div className="form-group">
          <label htmlFor="name">Category</label>
          <input
            id="name"
            class="form-control"
            type="text"
            name="category"
            placeholder="Teacher , Student, All"
            onChange={onChange}
            required
          />
          <Link className="btn btn-primary btn-sm mt-3" to="#" role="button">
            Choose File
          </Link>
          <button
            type="submit"
            className="btn btn-success btn-sm mt-3"
            style={{ marginLeft: "10px" }}
            value="Register"
          >
            Import Contacts
          </button>
        </div>
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Add New Contact
        </h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            class="form-control"
            type="text"
            name="firstName"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            class="form-control"
            type="text"
            name="lastName"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            class="form-control"
            id="email"
            type="email"
            name="email"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" value="Register">
          Add
        </button>
      </form>
      );
    </>
  );
}

export default ImportContacts;
