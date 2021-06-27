import React, { useState, useContext } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

function CreateAgenda() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [date, setDate] = useState(new Date());
  const [recurring, setRecurring] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [day, setDay] = useState({
    day: "1",
  });

  const onChangeSetDay = (e) => {
    setDay({ ...day, [e.target.name]: e.target.value });
  };

  const [email, setEmail] = useState({
    user_id: "",
    name: "",
    sent_to: "",
    subject: "",
    body: "",
    date: "",
    isRecurring: false,
    weekly: false,
    monthly: false,
    yearly: false,
    day: {},
  });

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleRecurring = (e) => {
    setRecurring(!recurring);
  };

  const handleWeekly = (e) => {
    setWeekly(!weekly);
  };

  const handleMonthly = (e) => {
    setMonthly(!monthly);
  };

  const handleYearly = (e) => {
    setYearly(!yearly);
  };

  const SendMail = async (e) => {
    e.preventDefault();
    email.date = date;
    email.user_id = user._id;
    email.isRecurring = recurring;
    email.weekly = weekly;
    email.monthly = monthly;
    email.yearly = yearly;
    email.day = day;
    setEmail({ ...email });

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
          <label htmlFor="name">Agenda Name</label>
          <input
            class="form-control"
            id="name"
            name="name"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sent_to">Recipient</label>
          <input
            class="form-control"
            id="sent_to"
            name="sent_to"
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
        <div className="form-group">
          <label htmlFor="date">Select date and time</label>
          <br></br>
          <DateTimePicker onChange={setDate} value={date} />
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="recurring"
            id="flexCheckDefault"
            onChange={handleRecurring}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Send Recurring Mails
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="weekly"
            id="flexCheckDefault"
            onChange={handleWeekly}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Weekly
          </label>
        </div>

        <select
          class="form-select"
          aria-label="Default select example"
          onChange={onChangeSetDay}
          name="day"
        >
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Sarturday</option>
          <option value="7">Sunday</option>
        </select>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="monthly"
            id="flexCheckDefault"
            onChange={handleMonthly}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Monthly
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="yearly"
            id="flexCheckDefault"
            onChange={handleYearly}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Yearly
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3" value="Register">
          Send Email
        </button>
      </form>
    </>
  );
}

export default CreateAgenda;
