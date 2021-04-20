export function getAppointmentsForDay(state, dayParam) {
  const currentDay = state.days.find(day => day.name === dayParam)
  if (state.days.length === 0 || currentDay === undefined ) {
    return [];
  }
  let result = currentDay.appointments.map(id => state.appointments[id])
  return result;
  // return state;
  // let result = [];
  // for (let day in state["days"]) {
  //   if (state["days"][day]["name"] === dayParam) {
  //     for (let i = 0; i < state["days"][day]["appointments"].length; i++) {
  //       let appIndex = state["days"][day]["appointments"][i]
  //       result.push(state["appointments"][appIndex]);         
  //     }
  //   }
  // }
  // return result;
  // const currentDay = state[0].data.find(day => day.name === dayParam)
  // console.log(currentDay)
  // for (let appointment of Object.values(state[1].data)) {
  //   if(currentDay.appointments.includes(appointment.id)) {
  //     result.push(appointment)
  //   }
  // }
  // return result;

};

export function getInterview(state, interview) {
  let result = {};
  // console.log("petunia", state, "petunia 2", interview);
  if (interview) {
    result.student = interview.student;
    result.interviewer = state["interviewers"][interview["interviewer"]];
    return result;
  } else {
  // const currentDay = state.days.find(day => day.name === dayParam)
  // if (state.days.length === 0 || currentDay === undefined ) {
  //   return [];
  // }
  // let result = currentDay.appointments.map(id => state.appointments[id])
  return null;
  }
};

export function getInterviewersForDay(state, dayParam) {
  // console.log("selector", state);
  const currentDay = state.days.find(day => day.name === dayParam)
  if (state.days.length === 0 || currentDay === undefined ) {
    // console.log("ssssss")
    return [];
  }
  // console.log("bbbbbbbbbb", currentDay)
  const availableInterviewersIds = currentDay.interviewers
  // console.log("cake", currentDay);
  // console.log("available interview", availableInterviewersIds);
  const availableInterviewers = Object.values(state.interviewers).filter(interviewer => availableInterviewersIds.includes(interviewer.id))
  // let result = currentDay.interviewers.map(id => state.appointments[id])
  return availableInterviewers;
}