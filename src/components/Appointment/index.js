import React from 'react'

import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Create from "./Form.js";
import useVisualMode from "../../hooks/useVisualMode";
import {getInterviewersForDay} from "../../helpers/selectors"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    //this code came from Compass
    console.log("save called", name, interviewer)
    const interview = {
      student: name,
      interviewer
    };
    //
    props.bookInterview(props.id, interview)
  }

  // console.log("butternut squash", props)

  // let nextComponent = "";
  // props.interview ?  nextComponent = <Show /> : nextComponent = <Empty />
  

  
  return(
    <div>
      <Header time="12pm"/>
      {/* {nextComponent} */}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // interviewer={[]}
        />
      )}
      {mode === CREATE && (
        <Create name="placeholder" onSave={save} onCancel={back} interviewers={props.interviewers} />
      )}
    </div>
  );
}