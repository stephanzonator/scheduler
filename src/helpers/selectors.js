export function getAppointmentsForDay(state, dayParam) {
  let result = [];
  for (let day in state["days"]) {
    if (state["days"][day]["name"] === dayParam) {
      for (let i = 0; i < state["days"][day]["appointments"].length; i++) {
        let appIndex = state["days"][day]["appointments"][i]
        result.push(state["appointments"][appIndex]);         
      }
    }
  }
  return result;
}
