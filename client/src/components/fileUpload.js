import React, { Fragment, useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose File");
  //change is required
  const [uploadedFile, setUploadedFile] = useState({});
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
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
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" id="customFile" onChange={onChange} />

          <input type="submit" value="Upload" />
        </div>
      </form>
    </Fragment>
  );
};

export default FileUpload;
