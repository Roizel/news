import React, { useRef, useState } from 'react' /*userRef. штука, тіпа як хук, сюди ми передаємо данні*/
import validatonFields from './Validation';
import { Formik, Form } from 'formik'; /*Formik, Крута штука, тіпа як дів тількі в світі react, круто структурує код*/
import MyTextInput from "../../common/MyTextInput";
import MyPhotoInput from '../../common/MyPhotoInput';
import { useHistory } from 'react-router'; /*For Redirecting*/
import { useDispatch } from 'react-redux'; /*For change variables in redux*/
import { RegisterUser } from '../../../actions/auth';


/*Formik - бібліотека, яка дозволяє повторно використовувати форми + має свої гібкі налаштування*/

const RegisterPage = () => {

    //це типу наш стейт
    const initState = {
        email: '',
        phone: '',
        login: '',
        password: '',
        confirmPassword: '',
        fio: '',
        photo: null,
    };

    //силка на наш формік
    const formikRef = useRef(); /*Ref for formik*/
    const titleRef = useRef(); /*Ref for errors title(IF ERRORS ONLY FROM SERVER)*/
    const [invalid, setInvalid] = useState([]); /*Ref for Errors from server*/
    const history = useHistory();

    const dispatch = useDispatch(); /*For change variables in redux*/
    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)
    const onSubmitHandler = (values) => {
        const formData = new FormData(); /*Create form, which can send some files and data*/
        /*In foreach we read all from initState and write it into form(For example: key - email
            value - value of email(loh@gmail.com))*/
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log("Нажалось")
        dispatch(RegisterUser(formData)) /*Call dispatch from redux and call our func(RegisterUser) and send formdata to it*/
            .then(result => {
                history.push("/");
            })
            .catch(ex => {
                const { errors } = ex;
                Object.entries(errors).forEach(([key, values]) => { /*Create from object massive with key and value(Dictionary from c#) and go with ForEach*/
                    let message = '';
                    values.forEach(text => message += text + " ");
                    formikRef.current.setFieldError(key, message); /*Set error to formik*/
                });
                setInvalid(errors.invalid);
                titleRef.current.scrollIntoView({ behavior: 'smooth' }) /*scroll up if exists errors(IF ERRORS ONLY FROM SERVER)*/
            });
    }
    //ретурнимо нашу сторінку типу замість рендеру
    return (

        <div className="row">
            <h1 ref={titleRef} className="text-center">Реєстрація</h1>
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
                <Formik /*Використання форміку*/
                    innerRef={formikRef} /*Получаєм силку*/
                    initialValues={initState} /*Тут ми кажем, що const initState буде нашим стейтом(Класа ж немає)*/
                    onSubmit={onSubmitHandler} /*На підтвердження вішаєм нашу функцію*/
                    validationSchema={validatonFields()  /*Кажем, що валідувати данні буде наш валідатор*/}>
                    <Form>

                        {/* присвоюєм значення в наш текстовий інпут /common/MyTextInput */}
                        <MyTextInput
                            label="Електрона пошта"
                            name="email"
                            type="Email"
                            id="email"
                            placeH="Введіть електрону пошту"
                        />

                        <MyTextInput
                            label="Номер телефону"
                            name="phone"
                            type="Number"
                            id="phone"
                            placeH="+38(000)000-00-00"
                        />
                        <MyTextInput
                            label="FIO"
                            name="fio"
                            type="text"
                            id="fio"
                            placeH="Write FIO"
                        />

                        <MyTextInput
                            label="Логін"
                            name="login"
                            type="text"
                            id="login"
                            placeH="Введіть логін"
                        />

                        <MyTextInput
                            label="Пароль"
                            name="password"
                            type="password"
                            id="password"
                            placeH="Введіть пароль"
                        />

                        <MyTextInput
                            label="Повторіть пароль"
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            placeH="Повторіть пароль"
                        />

                        {/* /common/MyPhotoInput */}
                        <MyPhotoInput /*Інша функція яка обробляє нашу фотку*/
                            myField="photo"
                            name="photo"
                            id="photo"
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