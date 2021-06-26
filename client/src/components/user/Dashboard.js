import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="jumbotron bg-light p-3 mt-4">
        <h1 className="display-4">Hello, User!</h1>
        <p className="lead">
          We provide an easy an efficient solution to scheduling bulk emails.
        </p>
        <hr className="my-4" />
        <p>Upload your contacts and schedule on the go.</p>

        <Link className="btn btn-primary btn-md" to="/dashboard" role="button">
          Import Contacts
        </Link>
        <Link
          className="btn btn-primary btn-md"
          style={{ marginLeft: "10px" }}
          to="/dashboard"
          role="button"
        >
          View Contacts
        </Link>
        <Link
          className="btn btn-success btn-md"
          style={{ marginLeft: "10px" }}
          to="/dashboard"
          role="button"
        >
          New Campaign
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
