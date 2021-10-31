import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux' /*For get data from redux*/
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth';
import { useHistory } from 'react-router';

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuth, user} = useSelector(redux => redux.auth) /*From authReducer*/ /*get isAuth, user from authReducer and rwite in into {isAuth}*/
    const onClickLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Новини | </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Головна</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Об-нас</a>
                            </li>
                        </ul>
                        {!isAuth ?
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Вхід</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Реєстрація</Link>
                                </li>
                            </ul> 
                            :
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">{user.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout" onClick = {onClickLogout}>Вихід</Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
