import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";
import PropTypes from "prop-types";

Appointment.propTypes = {
  // name: PropTypes.string.isRequired,
  // interviewer: PropTypes.object.isRequired,
  // setInterviewer: PropTypes.func.isRequired,
  interviewers: PropTypes.array.isRequired,
};

export default function Appointment(props) {
  const [getName, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer.id || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (getName === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(getName, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            data-testid="student-name-input"
            placeholder="Enter name here"
            value={getName}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button
            onClick={() => {
              validate();
            }}
            confirm
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
