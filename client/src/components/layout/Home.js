import React from "react";
import svg from "./undraw_content_vbqo.svg";

function Home() {
  return (
    <div className="container">
      {/* <h1> Email Scheduler </h1>
      <h3>Making scheduling hassle free</h3>
      <img
        src={svg}
        style={{ margin: "0px 30px", width: "800px", height: "800px" }}
      /> */}
      <center>
        <img src={svg} style={{ width: "60%", height: "60%" }} />
        <h1
          style={{
            color: "#104FBD",
            fontWeight: "bold",
            fontSize: "35px",
            paddingBottom: "120px",
            paddingTop: "40px",
          }}
        >
          Making Email Scheduling Hassle Free!
        </h1>
      </center>
    </div>
  );
}

export default Home;
