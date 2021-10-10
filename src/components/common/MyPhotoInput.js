import { useState } from "react";
import { useField } from 'formik';

const MyPhotoInput = ({ formikRef, ...props }) => { /*Приймаємо силку на формік і приймаємо всякі данні(в нашому випадку фото)*/


    // фото яке показується по замовчувані
    const [Photo, setPhoto] = useState("https://bytes.ua/wp-content/uploads/2017/08/no-image.png");
    const [error, serError] = useState("");
    const [field, meta] = useField(props); /*Присвоюємо в філди і мету пропси*/

    // функція яка викликається при події он чандж на інпуті
    const selectImage = (event) => {
        const FILE_OBJECT = event.currentTarget.files[0]; /*Присвоюємо фотку в змінну*/
        setPhoto(URL.createObjectURL(FILE_OBJECT)); /*НУ типу встановлюєм фото, але я не бачу що це таке setPhoto*/
        
        formikRef.current.setFieldValue(props.id, FILE_OBJECT);
    }

    return ( /*Вертаємо img і фоткі*/
        <div className="mb-3">
            <label htmlFor={props.name}>
                <img
                    src={Photo}
                    width="150"
                />
            </label>

            <input type="file"
                style={{ display: "none" }}
                className="form-control"
                id={props.id}
                onChange={selectImage} /*Вішаємо функцію на чендж*/
            />

            {meta.error && <span className="text-danger">{meta.error}</span>}
        </div>
    );
};

export default MyPhotoInput;