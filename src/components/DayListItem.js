import React from "react";
import classNames from 'classnames/bind';
import "styles/DayListItem.scss";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  let spotNum = props.spots;
  let spotPlural = "spots";

  if (props.spots === 0) {
    spotNum = "no";
  }

  if (props.spots === 1) {
    spotPlural = "spot";
  }
  // console.log("set to ", props.name);
  return (
    <li data-testid="day" className={dayClass} onClick={() => {props.setDay(props.name); }}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotNum} {spotPlural} remaining</h3>
    </li>
  );
}
