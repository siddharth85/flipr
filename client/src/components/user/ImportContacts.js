import React, { useState } from "react";
import axios from "axios";

function ImportContacts() {
  const [category, setCategory] = useState({
    category: "",
  });

  const SetCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const [contact, setContact] = useState([]);

  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const SelectFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const UploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {}
  };
  // ../../../public/upload/

  const ReadFile = async (e) => {
    const res = await axios.get("http://localhost:5000/read_file");
    const arr = res.data;

    arr.forEach((data) => {
      contact.push(data);
    });
    console.log(category);
    const obj = { category: category.category, contacts: contact };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/user/contact",
        obj,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const Form = {
    maxWidth: "500px",
    padding: "15px",
    margin: "auto",
    marginTop: "50px",
  };

  return (
    <>
      <label htmlFor="name">Category</label>
      <input
        id="name"
        className="form-control"
        type="text"
        name="category"
        placeholder="Teacher , Student, All"
        onChange={SetCategory}
        required
      />
      <form onSubmit={UploadFile}>
        <div>
          <input
            className="mt-3"
            type="file"
            id="customFile"
            onChange={SelectFile}
          />

          <input
            className="btn btn-primary btn-sm mt-3"
            type="submit"
            value="Upload"
          />
        </div>
      </form>
      <button onClick={ReadFile} className="btn btn-success mt-3" value="Read">
        Add
      </button>
      {/* <form style={Form}>
        <div className="form-group">
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
      </form> */}
    </>
  );
}

export default ImportContacts;
