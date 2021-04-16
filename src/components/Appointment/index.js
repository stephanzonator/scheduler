import React from 'react'

import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Create from "./Form.js";
import Status from "./Status.js";
import useVisualMode from "../../hooks/useVisualMode";
import {getInterviewersForDay} from "../../helpers/selectors"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    //this code came from Compass
    console.log("save called", name, interviewer);
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    //
    props.bookInterview(props.id, interview) //now it returns a promise\\
      .then(() => transition(SHOW))
  }

  function deleteFunc() {
    console.log("delete function called in appointment index");
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(()=> transition(EMPTY))
  }
  // console.log("butternut squash", props)

  // let nextComponent = "";
  // props.interview ?  nextComponent = <Show /> : nextComponent = <Empty />
  

  
  return(
    <div>
      <Header time={props.time}/>
      {/* {nextComponent} */}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteFunc}
        />
      )}
      {mode === CREATE && (
        <Create name="placeholder" onSave={save} onCancel={back} interviewers={props.interviewers} />
      )}
      {mode === SAVING && (
        <Status message="Saving..." />
      )}
      {mode === DELETING && (
        <Status message="Deleting..." />
      )}
    </div>
  );
}