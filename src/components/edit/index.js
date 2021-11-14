import React, { useRef, useState, useEffect } from 'react' /*userRef. штука, тіпа як хук, сюди ми передаємо данні*/
import validatonFields from './Validation';
import { Formik, Form } from 'formik'; /*Formik, Крута штука, тіпа як дів тількі в світі react, круто структурує код*/
import MyTextInput from "../common/MyTextInput";
import MyPhotoInput from '../common/MyPhotoInput';
import { useHistory } from 'react-router'; /*For Redirecting*/
import { useDispatch, useSelector } from 'react-redux'; /*For change variables in redux*/
import { useParams } from "react-router-dom";
import usersService from '../../services/users.service';
import EclipseWidget from '../common/eclipse/index'

/*Formik - бібліотека, яка дозволяє повторно використовувати форми + має свої гібкі налаштування*/

const EditPage = () => {

    //це типу наш стейт
    const initState = {
        email: '',
        fio: '',
        photo: null,
    };

    //силка на наш формік
    const formikRef = useRef(); /*Ref for formik*/
    const titleRef = useRef(); /*Ref for errors title(IF ERRORS ONLY FROM SERVER)*/
    const [invalid, setInvalid] = useState([]); /*Ref for Errors from server*/
    const [imagePath, setImagePath] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const {id} = useParams(); /*Id яку ми передали в сторінку з кнопкі*/
    const dispatch = useDispatch(); /*For change variables in redux*/
    const {editedUser} = useSelector(state => state.users);

    const onSubmitHandler = (values) => {
        const formData = new FormData(); 
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log(values);
        usersService.save(formData)
        .then(res=> history.push("/"))
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
    useEffect(() => {
        try {
            usersService.edit(id)
            .then(res => {
                const {data} = res;
                console.log(res.data);
                formikRef.current.setFieldValue("id", id);
                formikRef.current.setFieldValue("fio", data.fio);
                formikRef.current.setFieldValue("email", data.email);
                setImagePath("http://localhost:35635"+data.image);
                console.log("http://localhost:35635"+data.image);
                setLoading(false);
            })
        } 
        catch (error) {
            console.log("Server error global " + error.message);
        }
    }, []);

    return (

        <div className="row">
            <h1 ref={titleRef} className="text-center">Edit</h1>
            {
                invalid && invalid.length > 0 && /*create div for ERRORS ONLY FROM SERVER*/ /*if errors exists*/
                <div className="alert alert-danger">
                    <ul>
                        {
                            invalid.map((text, index) => { /*How ForEach, mapping errors and write it to list(ul{li})*/
                                return (
                                    <li key={index}>{text}</li>
                                );
                            })
                        }
                    </ul>

                </div>
            }
            <div className="offset-md-3 col-md-6">
                <Formik
                    enableReinitialize
                    innerRef={formikRef} /*Получаєм силку*/
                    initialValues={initState}
                    onSubmit={onSubmitHandler} /*На підтвердження вішаєм нашу функцію*/
                    validationSchema={validatonFields()  /*Кажем, що валідувати данні буде наш валідатор*/}>
                    <Form>
                        <MyTextInput
                            label="Електрона пошта"
                            name="email"
                            type="Email"
                            id="email"
                            placeH = {editedUser.email}
                        />
                        <MyTextInput
                            label="FIO"
                            name="fio"
                            type="text"
                            id="fio"
                            placeH = {editedUser.fio}
                        />
                        {imagePath &&
                            <MyPhotoInput
                                myField="photo"
                                name="photo"
                                id="photo"
                                data={imagePath}
                                formikRef={formikRef} /*Передаєм нашу силку в функцію, яка приймає цей formikRef*/
                            />
                        }
                           <MyTextInput
                            name="email"
                            type="hidden"
                            id="email"
                            value={id}
                        />
                        <button type="submit" className="btn btn-dark">Змінити</button>
                    </Form>
                </Formik>
            </div>
            {loading && <EclipseWidget/>}
        </div>
    )
}

export default EditPage;