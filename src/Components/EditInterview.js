import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import MultiSelect from "react-multi-select-component";

const EditInterview = (props) => {

    const [state, setState] = useState({
        ...props.location.state.interview,
        allUsers: props.location.state.users,
        errors: [],
        isEdited: false
    });

    const [userIds, setUserIds] = useState(state.users.map(e => ({label: e.id, value: e.id})));
    useEffect(() => {
        setState({...state, starttime: state.starttime.substring(0,16), endtime: state.endtime.substring(0,16)});
    },[]);
    const sendRequest =async (e) => {
        e.preventDefault();
        let res = null;
        try {
            res = await axios.patch(`http://localhost:3001/interviews/${state.id}`,{starttime: state.starttime, endtime: state.endtime, user_ids: userIds.map(e => e.value)});
            setState({...state,isEdited: true, errors: []});
        }
        catch(err){
            setState({...state, errors : err.response.data.error});
        }
    };
    
    const updateStartTime = e => {
        setState({...state,starttime: e.target.value});
    };
    const updateEndTime = e => {
        setState({...state,endtime: e.target.value});
    };

    const printErrors = () => {

        if(state.errors.length === 0)
            return '';  
        else{
            return (
                    <div className="alert alert-danger">
                    <h4 className="alert-heading">The following errors prevented the Interview from getting saved.</h4>
                    <ul>
                        {state.errors.map(error => <li key = {error}>{error}</li>)}
                    </ul>
                     <button onClick = {() => setState({...state, errors: []})} >Close</button>
                 </div> 
            );
        }
    };

    if(state.isEdited === true)
    {
        return (
            <Redirect to ="/" />
        );
    }
    return (
        <React.Fragment>
        <h1 className = "text-center"> Edit Interview</h1>
        {printErrors()}        
        <div className="container m-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <form className = "shadow p-3 mb-5 bg-dark rounded" onSubmit = {sendRequest}>
                    
                    <div className="form-group row">
                        <label className = "col-2 col-form-label text-light">Start-Time:</label>
                        <div className="col-10">
                            <input className = "form-control shadow rounded" type = "datetime-local" value = {state.starttime} onChange = {updateStartTime} />
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className = "col-2 col-form-label text-light">End-Time:</label>
                        <div className="col-10">
                            <input className = "form-control shadow rounded" type = "datetime-local" value = {state.endtime}  onChange = {updateEndTime} />
                        </div>
                    </div>
                    
                    <div className = "form-group row">
                        <label className = "col-2 col-form-label text-light">Users:</label>
                        <div className = "col-10">
                            <MultiSelect options={state.allUsers.map(user => ({ label: user.id, value: user.id}))} value={userIds} onChange={setUserIds} labelledBy={"Select"} />
                        </div>
                    </div>
                    
                    
                    <br />

                    <div className="form-group row justify-content-center">
                        <button className = "btn btn-outline-light btn-lg" type = "submit" >Edit Interview </button> 
                    </div>

                    </form>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}
export default EditInterview;
/*
    return (<h1>A</h1>);}
export default EditInterview;
*/