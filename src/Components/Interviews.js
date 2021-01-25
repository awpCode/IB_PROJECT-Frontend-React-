import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterviewRow from './InterviewRow';
import {Link} from 'react-router-dom';
const Interviews = () => {

    const [state,setState] = useState({
        interview: [],
        users: [],
        status: 'idle'
    });

    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
        const resInterviews = await axios.get('http://localhost:3001/interviews');
        const resUsers = await axios.get('http://localhost:3001/users');
        setState({
            interview : resInterviews.data,
            users : resUsers.data,
            status: 'complete'
        });
    };
    if(state.status === "idle"){
        return (
                <div className="text-center m-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        );
    }
    else{
    return (
        <React.Fragment>
        <h1>Interviews</h1>
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Users-Count</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {state.interview.map(interview => (
                    < InterviewRow key = {interview.id} interview = {interview} users = {state.users} />
                ))}
            </tbody>
        </table>
        {<Link to = {{pathname: '/interviews/new', state: state.users }} className = "btn btn-dark" >Schedule New Interview</Link>}
        </React.Fragment>
    );}
}
 
export default Interviews;