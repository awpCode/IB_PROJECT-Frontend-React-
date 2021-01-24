import React from 'react';

const ShowInterview = ({interview}) => {
    return (
        <tr>
            <td>{interview.id}</td>
            <td>{interview.users.length}</td>
            <td>{interview.starttime}</td>
            <td>{interview.endtime}</td>
            <td>Pending</td>
        </tr>
    );
}
 
export default ShowInterview;