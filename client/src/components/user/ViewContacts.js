import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function ViewContacts() {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  console.log(user);

  const [category, setCategory] = useState({
    category: "",
  });

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">Category</label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={onChange}
        >
          <option value="select">--</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="orange" defaultChecked="true">
            Orange
          </option>
          <option value="yellow">Yellow</option>
        </select>

        <Link className="btn btn-primary btn-sm mt-3" to="#" role="button">
          View Contacts
        </Link>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ViewContacts;
