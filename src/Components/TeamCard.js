// TeamCard.js

import React, { useContext, useState } from 'react';
import './TeamCard.css';
import { StateContext, DispatchContext } from '../Screen/TeamScreen'; // Assuming App.js is your parent component

const TeamCard = () => {
    const { team } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [sortByAge, setSortByAge] = useState(false);
  
    const removeFromTeam = (employee) => {
      dispatch({ type: 'REMOVE_FROM_TEAM', payload: employee });
    };

    const sortEmployeesByAge = () => {
        setSortByAge(!sortByAge);
    };

    const calculateAverageAge = () => {
        if (team.length === 0) return 0;
    
        const totalAge = team.reduce((acc, employee) => acc + employee.age, 0);
        const averageAge = totalAge / team.length;
// Round off the average age to two decimal places
        return averageAge.toFixed(2);
    };

    // Sort team members by age if sortByAge is true
    const sortedTeam = sortByAge ? [...team].sort((a, b) => a.age - b.age) : team;

    return (
        <div className='team-container'>
            <h2>Team</h2>
            {team.length > 0 && (
                <>
                    <button id="button" onClick={sortEmployeesByAge}>Sort by Age</button>
                    <p>Average Age: {calculateAverageAge()}</p>
                </>
            )}
            {sortedTeam.map((employee) => (
                <ul key={employee.id}>
                    <li>{employee.first_name} {employee.last_name}</li>
                    <li>{employee.age}</li>
                    <li><button onClick={() => removeFromTeam(employee)}>Remove</button></li>
                </ul>
            ))}


        </div>
    );
};

export default TeamCard;
