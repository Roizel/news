import React, { useEffect, useState } from 'react'
import http from "../../http_common";

const HomePage = () => {

    const [users, setUsers] = useState([
        {
            fio: "Cинок Маслай",
            email: "vv@vv.com",
            image: ""
        }
    ])

    useEffect(() => {
        http.get("api/users/all")
            .then(resp => {
                console.log(resp);
                setUsers(resp.data);
            });
    }, [])
    return (
        <div className="row">
            <h1 className="text-center">Головна сторінка</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ФІО</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.fio}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <img src={"http://localhost:35635"+user.image} width="150" alt="No Image"></img>
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
