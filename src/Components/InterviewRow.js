import React from 'react';
import {Link} from 'react-router-dom';
const InterviewRow = ({interview, users}) => {
    return (
        <tr>
            <td>{interview.id}</td>
            <td>{interview.users.length}</td>
            <td>{interview.starttime}</td>
            <td>{interview.endtime}</td>
            <td>
                {<Link to = {{pathname: `/interviews/${interview.id}/show`, state: {interview} }}  className = "badge badge-dark">Show</Link>} &nbsp;&nbsp;
                {<Link to = {{pathname: `/interviews/${interview.id}/edit`, state: {interview, users} }}  className = "badge badge-dark">Edit</Link>} 
            </td>
        </tr>
    );
}
 
export default InterviewRow;