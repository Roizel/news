import classnames from "classnames";
import React, { Component } from 'react'
import InputTextField from '../../common/inptTextField'; /*Підключаєм наш класс*/
import { validationFields } from './validation'; /*Підключаєм нашу Валідацію*/

export class RegisterPage extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '', /*Тіж самі змінні, нічого нового*/
        fio: '',
        Photo: '',
        BasePhoto: '',
        fileimage: '',
        isValidation: false,
        errors: {
            email: '',
            password: '', /*Тут ми зберігаємо помилки*/
            confirmPassword: '',
            fio: '',
        }
    }
    onChangePhoto = (e) => {
        const files = e.target.files;
        var Photo;
        if (files && files[0]) { // перевіряємо чи файл обрано
            const file = files[0]; // присваюємо
            if (file.type.match(/^image\//)) { // перевіряємо чи тип файлу фото
                var reader = new FileReader(); // створюємо змінну
                reader.onload = function () { // після загрузки файлу виконуємо наступний код....

                    Photo = reader.result;
                }
                reader.readAsDataURL(file); //використовується для читання File. Коли операція закінчиться
                this.state.BasePhoto = Photo;
            }
        }
        const { isValidation } = this.state; // втановюємо значення isValidation (тру якщо форма вже надсилалася)
        if (isValidation) // якщо значення тру
        {
            const data = { ...this.state, 'Photo': Photo } // розширяємо наш стейт і присвоюємо значення
            const errors = validationFields(data) // надсилаєм дані щоб перевірити валідність тут дані перевіряються динамічно
            this.setState({ 'Photo': Photo, errors: errors }); // повторно рендерим з первіреними даними
        }
        else {
            this.setState({ 'Photo': Photo }) // повторно рендерим наш інпут з новим значенням
            this.setState({ 'Photo': Photo })
        }
        console.log("Loh",this.state);
    }
    onSubmitHandler = (e) => { /*Собственно ручно створена функця, яка реагує відправку форми*/
        e.preventDefault(); /*Спеціальна штука, щоб сторінка не перезагружалась кучу раз*/
        var errors = validationFields(this.state);
        const isValid = Object.keys(errors).length === 0; /*Робим перевірку на інт, і чі там щось є*/
        if(isValid) /*Якщо немає, кідаєм данні на серв*/
        {
            //const json = JSON.parse(this.state);
            alert(this.state);
        }
        else /*Якщо ні, кажем користувачу, що він лох*/
        {
            this.setState({errors: errors, isValidation: true});
        }
        this.setState({errors: errors, isValidation: true});
        console.log("Наш стейт", this.state);
    }
    onChangeHandler = (e) => { /*Собственно ручно створена функця, яка реагує на кожний символ*/ 
        const {name, value} = e.target;
        //console.log(name, value);
        const {isValidation} = this.state;
        if(isValidation)
        {
            const data = { ...this.state,
                            [name]: value };
            const errors = validationFields(data); /*Кідаєм данні в цю функ*/
            this.setState({[name]: value, errors: errors});
        }
        else
            this.setState({[name]: value});
    }
    updateInput(event){
        this.setState({fileimage : event.target.value})
        }
    render() {
        //console.log(this.state);
        const {errors} = this.state;
        return ( /*Тіпа рендерим все що ми вертаєм*/
            <div className="row">
                <h1 className="text-center">Реєстрація</h1>
                <div className="offset-md-3 col-md-6">
                    <form onSubmit={this.onSubmitHandler} enctype="multipart/form-data">
                        
                        <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="fio"
                            label="ПІБ"
                            value={this.state.fio}
                            error={errors.fio}
                            onChange={this.onChangeHandler}
                         />

                        <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="email"
                            label="Пошта"
                            value={this.state.email}
                            error={errors.email}
                            onChange={this.onChangeHandler}
                         />
                             <div className="mb-3">
                            <input type="file"
                                className={classnames("form-control",
                                    { "is-invalid": errors.BasePhoto },
                                    { "is-valid": errors.BasePhoto == undefined }
                                )}
                                id="Photo"
                                name="Photo"
                                value={this.state.Photo}
                                onChange={this.onChangePhoto}
                                placeholder="Натисніть для вибору фото"
                            />
                             <img src={`data:image/jpeg;base64,${this.state.BasePhoto}`} id="PhotoBase" name="PhotoBase" alt="Твоє фото" width="50px" height="50px" webkitdirectory multiple></img>
                            {!!errors.Photo && <div className="invalid-feedback">{errors.Photo}</div>}
                        </div>

                          {/* <img src={this.state.fileimage} alt="No Image"/>
                          <input type="file" class="custom-file-input" value={this.state.fileimage} onChange={this.onChangeFile}/> */}
                        <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="password"
                            label="Пароль"
                            value={this.state.password}
                            error={errors.password}
                            onChange={this.onChangeHandler}
                            type="password"
                         />

                         <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="confirmPassword"
                            label="Повтор пароль"
                            value={this.state.confirmPassword}
                            error={errors.confirmPassword}
                            onChange={this.onChangeHandler}
                            type="password"
                         />

                        <button type="submit" className="btn btn-success">Реєстрація</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterPage