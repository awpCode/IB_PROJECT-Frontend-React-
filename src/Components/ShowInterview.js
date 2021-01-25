import React from 'react';
import ShowUser from './ShowUser';

const ShowInterview = (props) => {
    const {interview} = props.location.state;
    return (
        <div className="container mt-4">
            <h3>Interview Start Time: {interview.starttime}</h3>
            <h3>Interview End Time: {interview.endtime}</h3>
            <br />
            <h4>Partipant Details:</h4>
            <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">User ID</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>{interview.users.map(user => (
                <ShowUser key = {user.id} user = {user} />
            ))}</tbody>
            </table>
            </div>

    );
}
 
export default ShowInterview;