import React from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik'; /*Те саме що і у реєстрації*/
import MyTextInput from "../../common/MyTextInput";

/*Все коментарі були описані у RegistrationPage*/

const LoginPage=()=>{ /*Тут буде наш стейт*/

    const initState = {
        email: '',
        password: '',
    };

    const onSubmitHandler=(values) =>
    {
        console.log("Server submit data", values);
    }


    return (
        <div className="row">
            <h1 className="text-center">Вхід</h1>
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
