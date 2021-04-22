import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "styles/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

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
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
          // onSave={save}
        />
      );
    }
  );

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
      <section className="schedule">{schedule}</section>
    </main>
  );
}
