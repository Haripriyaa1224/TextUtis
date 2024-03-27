// EmployeeCard.js

import React, { useContext } from 'react';
import './EmployeeCard.css';
import employees from './EmployeeData';
import { StateContext, DispatchContext } from '../Screen/TeamScreen'; // Assuming App.js is your parent component

const EmployeeCard = () => {
    const { team } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
  
    const addToTeam = (employee) => {
      dispatch({ type: 'ADD_TO_TEAM', payload: employee });
    };
  
    // Function to check if an employee is in the team
    const isInTeam = (employee) => {
      return team.some((teamMember) => teamMember.id === employee.id);
    };
  
    return (
      <div className='e-container'>
        <h1>Employees</h1>
        {employees.map((employee) => {
          const isAdded = isInTeam(employee); // Check if employee is in the team
          return (
            <div key={employee.id} className={`e-card ${isAdded ? 'disabled' : ''}`}>
              <ul>
                <li>{employee.first_name} {employee.last_name}</li>
                <li>{employee.age}</li>
                <li>
                  {/* Disable the button if employee is in the team */}
                  <button onClick={() => addToTeam(employee)} disabled={isAdded}>Add</button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default EmployeeCard;
