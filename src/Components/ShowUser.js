import React from 'react';

const ShowUser = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>Nil</td>
        </tr>
    );
}
 
export default ShowUser;