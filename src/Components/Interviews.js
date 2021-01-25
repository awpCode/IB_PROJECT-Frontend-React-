import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterviewRow from './InterviewRow';
import {Link} from 'react-router-dom';
import ShowUser from './ShowUser';
import './css/Interview.css';
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
        <h1 className = "text-center">Interviews</h1>
        <table className="table table-bordered">
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

        <br /><br/>
        <hr className = "fancyLine5"/>
        <h1 className = "text-center">Users</h1>
        <table className="table table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody className = "autoScroll">
                {state.users.map(user => (
                    < ShowUser key = {user.id} user = {user} />
                ))}
            </tbody>
        </table>
        </React.Fragment>
    );}
}
 
export default Interviews;