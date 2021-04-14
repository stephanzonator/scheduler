import React from 'react'

import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";



export default function Appointment(props){
  let nextComponent = "";
  props.interview ?  nextComponent = <Show /> : nextComponent = <Empty />
  
  
  return(
    <div>
      <Header time="12pm"/>
      {nextComponent}
    </div>
  );
}