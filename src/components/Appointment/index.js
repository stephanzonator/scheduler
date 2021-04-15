import React from 'react'

import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Create from "./Form.js";
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
          // interviewer={props.interview.interviewer}
          interviewer={[]}
        />
      )}
      {mode === CREATE && (
        <Create name="placeholder" onCancel={back} interviewers = {[]} />
      )}
    </div>
  );
}