import React from "react";
// import classNames from 'classnames/bind';
import "styles/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

/*
required props
interviewers{array}
interviewer{number}
setInterviewer{function}
*/

import PropTypes from "prop-types";

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  interviewer: PropTypes.number.isRequired,
  setInterviewer: PropTypes.func.isRequired,
};

export default function InterviewerList(props) {
  // console.log("props.interviewer :)", props.interviewer)
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        // setInterviewer={interviewer.setInterviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return <ul className="interviewers__list">{interviewers}</ul>;
}
