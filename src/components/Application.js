import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "styles/Application.scss";
import {getAppointmentsForDay, getInterview} from "helpers/selectors"
import Appointment from "./Appointment";

/* Const days default data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
*/

/* Const appointments default data
const appointArray = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Firstnamia Lastnamia",
      interviewer: {
        id: 1,
        name: "Name Mcnamey",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];
*/


export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: []
  });

  // const dailyAppointments = [];

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }))
  // }  
  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    // const testURL = `http://localhost:8001/api/days`;
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(([{data: days}, {data:appointments}, {data:interviewers}]) => {
      console.log("KUMQUAT******", "pumpkin");

      setState(prev => ({...prev, days, appointments, interviewers
        //days: all[0]["data"], appointments: getAppointmentsForDay(state, state.day)
      // getAppointmentsForDay(all, state.day) 
      //, third: all[2] 
      }));
    })
    .catch(response => {console.log("brussels sprout error", response )})
    // axios.get(testURL)
    //   .then(response => {
    //     console.log("potato", response.data);
    //     // setDays(response.data);
    //   })
      
      ;
  }, [])
  
  // let schedule = [];
  // for (appointment of appointments) {schedule.push({ <Appointment key={appointment.id} {...appointment} /> })}
  // const schedule = appointArray.map((appointment) => ({ "lskj";}) //key={appointment.id} {...appointment}) />}
  // );
  // const schedule = <Appointment />
  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return (<Appointment key={appointment.id} {...appointment} interview={interview}/>)      
  });
  


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          // setDay={day => console.log(day)}
          setDay={setDay}
        />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
    
    
  );
}
