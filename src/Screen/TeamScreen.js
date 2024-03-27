// App.js
import './TeamScreen.css'
import React, { useReducer } from 'react';
import EmployeeCard from '../Components/EmployeeCard';
import TeamCard from '../Components/TeamCard';


// Define initial state
const initialState = {
  team: [],
};

// Define reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_TEAM':
          return {
            ...state,
            team: [...state.team, action.payload],
          };
        case 'REMOVE_FROM_TEAM':
          return {
            ...state,
            team: state.team.filter(employee => employee.id !== action.payload.id),
          };
        default:
          return state;
      }
};

// Create context
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const TeamScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className='main'>
          <EmployeeCard />
          <TeamCard />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default TeamScreen;
