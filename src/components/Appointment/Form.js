import React, { useState } from 'react'
import Button from "../Button"
import InterviewerList from "../InterviewerList";



export default function Appointment(props){
  const [getName, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer.id || null);
  
  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter name here" 
            value = {getName}
            onChange = {event => setName(event.target.value)}
            
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => props.onSave(getName, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>  
  );
}
