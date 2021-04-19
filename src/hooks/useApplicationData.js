import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: []
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
    .then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        // console.log("KUMQUAT******", "pumpkin");

        setState((prev) => ({
          ...prev,
          days,
          appointments,
          interviewers,
          //days: all[0]["data"], appointments: getAppointmentsForDay(state, state.day)
          // getAppointmentsForDay(all, state.day)
          //, third: all[2]
        }));
      }
    )
    .catch((response) => {console.log("brussels sprout error", response)})

  }, []); //, [state.days]
  
  const setDay = day => setState({ ...state, day });

  const updateRemainingSpots = function(state, appointments){
    let days = [...state.days]
    // console.log("update remaining spots:", days)
    // let daysVar;
    return state.days.map((d) => {
      let counter = 0;
      d.appointments.forEach((app) => {
        if (appointments[app].interview) {
          counter += 1;
        }
      })
      console.log("counter", counter);
      // const appointmentNumber = d.appointments.length;
      // if () {}
      const day = {...state.days[d.id-1], spots: 5- counter}
      return {...day}
      //[...state.days]}
    })
    // console.log("update remaining spots 2", daysVar)
    // return daysVar;
    // return state.days;
    // ...state, state.days = [5 - ...state.days] //state.appointments.length
    /*
    day = {...day, spots = 5 - }
    state.days = [..days]
    */

    
  }

  const bookInterview = function(id, interview) {
    console.log("interview booked: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    
    // axios.get(`http://localhost:8001/api/debug/reset`)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(data => {
      const days = updateRemainingSpots(state, appointments);
      // console.log(days);
      setState({...state, appointments, days});
    })
    // .catch(res => console.log("fatal error in Application.js", res));
  }

  const deleteInterview = function(id) {
    console.log("deleteInterview called: ", id);
    const appointment = {
        ...state.appointments[id],
        interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("potato", appointment, appointments);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((data) => {
        console.log(data);
        const days = updateRemainingSpots(state, appointments);
        console.log("delete func, days", days)
        setState({ ...state, appointments, days});
      })
     .catch(res => console.log("fatal error in useApplicationData.js", res));
     
  } 

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}