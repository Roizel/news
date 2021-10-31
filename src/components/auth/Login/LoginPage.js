import React, {useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik'; /*Те саме що і у реєстрації*/
import MyTextInput from "../../common/MyTextInput";
import { LoginUser } from '../../../actions/auth';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

/*Все коментарі були описані у RegistrationPage*/

const LoginPage = () => { /*Тут буде наш стейт*/

    const initState = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const history = useHistory();
    const onSubmitHandler=(values) =>
    {
       dispatch(LoginUser(values))
           .then(result => {
               history.push("/");
           })
           .catch(ex => {
               setInvalid(ex.errors.invalid);
           })
    }


    return (
        <div className="row">
            <h1 className="text-center">Вхід</h1>
            {
                invalid && invalid.length > 0 &&                            /*create div for ERRORS ONLY FROM SERVER*/ /*if errors exists*/
                <div className="alert alert-danger">
                    <ul>
                        {
                            invalid.map((text, index) => {                 /*How ForEach, mapping errors and write it to list(ul{li})*/
                                return (
                                    <li key={index}>{text}</li>

                                );
                            })
                        }
                    </ul>
                </div>
            }
            <div className="offset-md-3 col-md-6">
            <Formik /*Все те саме що і у реєстрації*/
                initialValues = {initState} 
                onSubmit={onSubmitHandler}
                validationSchema= {validatonFields()}>
                <Form>

                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "Email"
                        id= "email"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "password"
                        type = "password"
                        id= "password"
                    />


                    <button type="submit" className="btn btn-dark">Увійти</button>
                </Form>
            </Formik>
            </div>
        </div>
    )
}

export default LoginPage
