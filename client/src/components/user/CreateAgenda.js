import React, { useState, useContext } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

function CreateAgenda() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [date, setDate] = useState(new Date());

  const [email, setEmail] = useState({
    user_id: "",
    name: "",
    sent_to: "",
    subject: "",
    body: "",
    date: "",
    isRecurring: false,
  });

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const SendMail = async (e) => {
    e.preventDefault();
    email.date = date;
    email.user_id = user._id;
    setEmail({ ...email });
    console.log(email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/send_mail",
        email,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={SendMail}>
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Add New Email Agenda
        </h2>
        <div className="form-group">
          <label htmlFor="agendaName">Agenda Name</label>
          <input
            id="agendaName"
            class="form-control"
            type="text"
            name="agendaName"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipient">Recipient</label>
          <input
            class="form-control"
            id="recipient"
            name="recipient"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject Line</label>
          <input
            id="subject"
            class="form-control"
            type="text"
            name="subject"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <input
            class="form-control"
            id="body"
            name="body"
            onChange={onChange}
            required
          />
        </div>
        <DateTimePicker onChange={setDate} value={date} />
        {/* <DatePickerComponent
          placeholder="Enter Date"
          value={dateValue}
          id="date"
          name="date"
          format="dd-MMM-yy"
          onChange={onChange}
        ></DatePickerComponent>

        <div className="form-group">
          <label htmlFor="time">Enter time in IST format</label>
          <TimePicker value={time} id="time" name="time" onChange={setTime} />
        </div> */}

        <button type="submit" className="btn btn-primary mt-3" value="Register">
          Send Email
        </button>
      </form>
    </>
  );
}

export default CreateAgenda;
