import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Row from "./Row";

function ViewContacts() {
  const [email, setEmail] = useState([]);

  const getDetails = async (e) => {
    const res = await axios.get("http://localhost:5000/api/sent");
    const arr = res.data;
    email.push(arr);
    // console.log(email);
  };

  return (
    <>
      <div className="contaniner">
        <button
          onClick={getDetails}
          className="btn btn-success mt-3"
          value="Read"
        >
          Fetch Data
        </button>
      </div>
      <h4>Sent Mails</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Agenda Name</th>
            <th scope="col">Subject</th>
            <th scope="col">Body</th>
            <th scope="col">Sent To</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {/* {email.sent.forEach((info) => (
            <tr>
              <th scope="row">1</th>
              <td>info.data.name</td>
              <td>info.data.subject</td>
              <td>info.data.body</td>
              <td>info.data.sent_to</td>
              <td>info.time</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </>
  );
}

export default ViewContacts;
