import React from "react";
import classNames from "classnames/bind";
import "styles/InterviewerListItem.scss";

/*
required props
id={number}
name={string}
avatar={url}
selected={boolean}
setInterviewer={function} 
*/

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    // "day-list__item--full": (props.spots === 0)

    //"interviewers__item">
  });

  return (
    <li onClick={props.setInterviewer} className={InterviewerListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar} //"https://i.imgur.com/LpaY82x.png"
        alt={props.name} //"Sylvia Palmer"
      />
      {props.selected ? props.name : ""}
    </li>
  );
}
