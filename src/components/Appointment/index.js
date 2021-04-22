import React from "react";

import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import Status from "./Status.js";
import useVisualMode from "../../hooks/useVisualMode";
import { getInterviewersForDay } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // console.log("save called", name, interviewer);
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview) //now it returns a promise
      .then(() => transition(SHOW))
      .catch((res) => transition(ERROR_SAVE, true));
  }

  function deleteFunc() {
    // console.log("delete function called in appointment index,", props.deleteInterview);
    transition(DELETING);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((res) => {
        transition(ERROR_DELETE, true);
        console.log("oh oh the server is borked");
      });
  }
  // console.log("butternut squash", props)

  return (
    <article data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          name=""
          onSave={save}
          onCancel={back}
          interviewer={{}}
          interviewers={props.interviewers}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          onSave={save}
          onCancel={back}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
        />
      )}

      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Do you want to delete?"
          onCancel={back}
          onConfirm={deleteFunc}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Do you want to delete?"
          message="Error: Could not save"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Do you want to delete?"
          message="Error: Could not delete"
          onClose={back}
        />
      )}
    </article>
  );
}
