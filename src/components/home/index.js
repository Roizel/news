import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UsersAll, UserDelete } from '../../actions/users';

const HomePage = () => {
    const dispatch = useDispatch();
    const {list} = useSelector(state => state.users);

    useEffect(() => {
        try 
        {
            dispatch(UsersAll())
            .then()
            .catch()
        } 
        catch (error) {
            console.log("Server error global");
        }
    }, [])
    
    const onDeleteClick = (id) => {
        try {
          dispatch(UserDelete(id))
          .then()
          .catch(); 
        } catch (error) {
            
        }
    }
    return (
        <div className="row">
            <h1 className="text-center">Головна сторінка</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ФІО</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.fio}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <img src={"http://localhost:35635"+user.image+"?t="+new Date().getTime()} alt="Самогон" width="150" />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => onDeleteClick(user.id)} className="btn btn-danger">Delete</button>
                                        <Link className="btn btn-dark" to={`/user/edit/${user.id}`}>Edit</Link>
                                    </td>
                                </tr>

                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
