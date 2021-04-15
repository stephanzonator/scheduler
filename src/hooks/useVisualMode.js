import React, {useState} from "react";


export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { 
    // setMode(mode);
    // console.log("pumpkin", mode);

    
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    // newHistory.push(mode);
    const newHistoryTwo = [...newHistory, mode] // Reacty way
    setHistory(newHistoryTwo);

    // setHistory.push()
    // return mode;
  }
  function back() {
    if (history.length < 2) {
      return
    }

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    })

    // setHistory(newHistory);
    // const index = newHistory.length-1;
    // setMode(newHistory[index]);
    // return mode;    
  }

  const mode = history[history.length-1]
  return { mode, transition, back };
};
