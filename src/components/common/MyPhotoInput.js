import { useState } from "react";
import { useField } from 'formik';

const MyPhotoInput = ({ myField, formikRef, data, ...props }) => { /*Приймаємо силку на формік і приймаємо всякі данні(в нашому випадку фото)*/


    // фото яке показується по замовчувані
    const [photo, setPhoto] = useState(data ? data : "https://bytes.ua/wp-content/uploads/2017/08/no-image.png");
    const [error, setError] = useState("");
    const [field, meta] = useField(props); /*Присвоюємо в філди і мету пропси*/

    // функція яка викликається при події он чандж на інпуті
    const selectImage = (event) => {
        const files= event.currentTarget.files; /*Записуєм у files фотку*/
        if (!(files && files[0])) { /*Перевірка на наявність фото*/
            setError("Оберіть файл.");
            return;
        }

        if (!files[0].type.match(/^image\//)) {
            setError("Оберіть фото."); /*Перевірка на тип фото*/
            return;
        }

        if (((files[0].size / 1024) / 1024) >10) {
            setError("Файл не може бути більше 10 Мб."); /*Перевірка на розмір фото(макс 10 мб)*/
            return;
        }
        setPhoto(URL.createObjectURL(files[0])); /*Якщо все ок, то создаємо об'єкт*/
        formikRef.current.setFieldValue(myField, files[0]); /*Вставляєм в наш формік фото*/
        setError("");
    }

    return ( /*Вертаємо img і фоткі*/
        <div className="mb-3">
            <label htmlFor={props.name}>
                <img
                    src={photo}
                    width="150"
                />
            </label>

            <input type="file"
                style={{ display: "none" }}
                className="form-control"
                id={myField}
                onChange={selectImage} /*Вішаємо функцію на чендж*/
            />
            {error && <span className="text-danger">{error}</span>}

            {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
        </div>
    );
};

export default MyPhotoInput;