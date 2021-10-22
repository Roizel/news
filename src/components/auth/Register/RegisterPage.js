import React, {useRef} from 'react' /*userRef. штука, тіпа як хук, сюди ми передаємо данні*/
import validatonFields from './Validation';
import {Formik, Form} from 'formik'; /*Formik, Крута штука, тіпа як дів тількі с світі react, круто структурує код*/
import MyTextInput from "../../common/MyTextInput";
import MyPhotoInput from '../../common/MyPhotoInput';
import http from "../../../http_common";

/*Formik - бібліотека, яка дозволяє повторно використовувати форми + має свої гібкі налаштування*/

const RegisterPage=() => {

    //це типу наш стейт
    const initState = {
        Email: '',
        Phone: '',
        Login: '',
        Password: '',
        ConfirmPassword: '',
        FIO: '',
        Photo: null,
    };

    //силка на наш формік
    const formikRef = useRef();


    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)
    const onSubmitHandler=(values) =>
    {
        const formData = new FormData(); /*Create form, which can send some files and data*/
        /*In foreach we read all from initState and write it into form(For example: key - email
            value - value of email(loh@gmail.com))*/
        Object.entries(values).forEach(([key,value]) => formData.append(key,value));
        console.log("Нажалось")

        http.post("api/account/register", formData,
        {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        
        }).then(good => {
            console.log("Good result", good);

        }, badResult => {
            const {errors} = badResult.response.data;
            if(errors.Email) {
                let tmp="";
                errors.Email.forEach(message => {
                    tmp += message + " ";
                    console.log("Error from RegisterPage: Email", tmp);
                    formikRef.current.setFieldError("Email" ,message);
                });
            }
        });
    }
    //ретурнимо нашу сторінку типу замість рендеру
    return (
        <div className="row">
            <h1 className="text-center">Реєстрація</h1>
            <div className="offset-md-3 col-md-6">
            <Formik /*Використання форміку*/
                innerRef={formikRef} /*Получаєм силку*/
                initialValues = {initState} /*Тут ми кажем, що const initState буде нашим стейтом(Класа ж немає)*/ 
                onSubmit={onSubmitHandler} /*На підтвердження вішаєм нашу функцію*/
                validationSchema= {validatonFields()  /*Кажем, що валідувати данні буде наш валідатор*/}>
                <Form>

                    {/* присвоюєм значення в наш текстовий інпут /common/MyTextInput */}
                    <MyTextInput
                        label = "Електрона пошта"
                        name = "Email"
                        type = "Email"
                        id= "Email"
                        placeH = "Введіть електрону пошту"
                    />

                    <MyTextInput
                        label = "Номер телефону"
                        name = "Phone"
                        type = "Number"
                        id= "Phone"
                        placeH = "+38(000)000-00-00"
                    />
                      <MyTextInput
                        label = "FIO"
                        name = "FIO"
                        type = "text"
                        id= "FIO"
                        placeH = "Write FIO"
                    />

                    <MyTextInput
                        label = "Логін"
                        name = "Login"
                        type = "text"
                        id= "Login"
                        placeH = "Введіть логін"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "Password"
                        type = "password"
                        id= "Password"
                        placeH = "Введіть пароль"
                    />

                    <MyTextInput
                        label = "Повторіть пароль"
                        name = "ConfirmPassword"
                        type = "password"
                        id= "ConfirmPassword"
                        placeH = "Повторіть пароль"
                    />

                    {/* /common/MyPhotoInput */}
                    <MyPhotoInput /*Інша функція яка обробляє нашу фотку*/
                            myField="Photo"
                            name="Photo"
                            id="Photo"
                            formikRef={formikRef} /*Передаєм нашу силку в функцію, яка приймає цей formikRef*/
                        />
                    {/* кнопка відправки форми */}
                    <button type="submit" className="btn btn-dark">Реєстрація</button>
                </Form>
            </Formik>
            </div>
        </div>
    )
}

export default RegisterPage;


