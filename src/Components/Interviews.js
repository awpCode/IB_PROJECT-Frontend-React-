import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterviewRow from './InterviewRow';
const Interviews = () => {

    const [interviews,setInterviews] = useState({
        interview: [],
        status: 'idle'
    });

    useEffect(() => {
        getInterviews();
    },[]);

    const getInterviews = async () => {
        const res = await axios.get('http://localhost:3001/interviews');
        setInterviews({
            interview : res.data,
            status: 'complete'
        });
    };

    if(interviews.status === "idle"){
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
                {interviews.interview.map(interview => (
                    < InterviewRow key = {interview.id} interview = {interview} />
                ))}
            </tbody>
        </table>
        </React.Fragment>
    );}
}
 
export default Interviews;