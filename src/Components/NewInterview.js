import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
const NewInterview = () => {
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [userIds, setUserIds] = useState([]);
    const [users, setUsers] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        getUsers();
    },[])

    const getUsers = async () => {
        const res = await axios.get('http://localhost:3001/users');
        setUsers(res.data);
    };

    const postInterview = e => {
        e.preventDefault();
        submitInterview();
    };

    const submitInterview =async () => {
        let res = null;
        try {
            res = await axios.post('http://localhost:3001/interviews',{starttime: starttime, endtime: endtime, user_ids: userIds.map(e => e.value)});
            setIsAdded(true);
        }
        catch(err){
            console.log(err.response.data);
        }
        
    };

    const updateStartTime = e => {
        setStarttime(e.target.value);
    };
    const updateEndTime = e => {
        setEndTime(e.target.value);
    };

    if(isAdded)
    {
        return (
            <Redirect to ="/" />
        );
    }
    return (
        <React.Fragment>
        <h1 className = "text-center"> Schedule New Interview</h1>
        <div className="container m-5">
        <div className="row justify-content-center">
        <div className="col-10">
        <form className = "shadow p-3 mb-5 bg-dark rounded" onSubmit = {postInterview}>
        
        <div className="form-group row">
            <label className = "col-2 col-form-label text-light">Start-Time:</label>
            <div className="col-10">
                <input className = "form-control shadow rounded" type = "datetime-local" value = {starttime} onChange = {updateStartTime} />
            </div>
        </div>
        
        <div className="form-group row">
            <label className = "col-2 col-form-label text-light">End-Time:</label>
            <div className="col-10">
                <input className = "form-control shadow rounded" type = "datetime-local" value = {endtime}  onChange = {updateEndTime} />
            </div>
        </div>
        
        <div className = "form-group row">
            <label className = "col-2 col-form-label text-light">Users:</label>
            <div className = "col-10">
            <MultiSelect
            options={users.map(user => (
            { label: user.id,
              value: user.id
            }
             ))}
             value={userIds}
             onChange={setUserIds}
            labelledBy={"Select"}
            />
            </div>
        </div>

        <br />

        <div className="form-group row justify-content-center">
            <button className = "btn btn-outline-light btn-lg" type = "submit" >Create Interview </button> 
        </div>

        </form>
        </div>
        </div>
        </div>
        </React.Fragment>
    );
}
 
export default NewInterview;

/*

<label>Select Users:</label>
<select multiple = {true} value = {userIds} onChange = {updateUserIds} >
    {users.map(user => (
        <option key = {user.id} value = {user.id}>{user.id}</option>
    ))}
</select>

*/

/*
 /*
const updateUserIds = e => {
    
    console.log(e.target.value);
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setUserIds(value);
    
    if(userIds.includes(e.target.value) === true){
        setUserIds(userIds.filter(ele => ele !== e.target.value));
    }
    else{
        setUserIds([...userIds, e.target.value]);
    }
    console.log(userIds);
};
    */

/*


axios.post('http://localhost:3001/interviews',{
          starttime: starttime,
          endtime: endtime,
          user_ids: userIds.map(e => e.value)
        })
        .then(res => console.log(res))
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });


*/