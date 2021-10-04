import { object } from 'prop-types';
import React, { Component } from 'react'
import InputTextField from '../../common/inptTextField'; /*Підключаєм наш класс*/
import { validationFields } from './validation'; /*Підключаєм нашу валідацію*/

export class LoginPage extends Component {
    state = { /*Приватні поля, або ж поля класу, щось типу такого*/
        email: '',
        password: '',
        isValidation: false,
        errors: {
            email: '', /*Тут ми будем писать хранить ошикбі*/
            password: ''
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        var errors = validationFields(this.state); /*Функція, в якій ми щось робимо*/
        const isValid = Object.keys(errors).length === 0; /*Робим перевірку на інт, і чі там щось є*/
        if(isValid) /*Якщо немає, кідаєм данні на серв*/
        {
            console.log("send server", this.state);
        }
        else{ /*Якщо ні, кажем користувачу, що він лох*/
            this.setState({errors: errors, isValidation: true});
        }
    }
    onChangeHandler = (e) => {
        const {name, value} = e.target; // витягуємо імя і значення з інпута 
        const {isValidation} = this.state; // вcтановлюємо значення isValidation (тру якщо форма вже надсилалася)
        if(isValidation)
        {
            const data = { ...this.state, // розширяємо наш стейт і присвоюємо значення
                            [name]: value };
            const errors = validationFields(data); // надсилаєм дані щоб перевірити валідність тут дані перевіряються динамічно
            this.setState({[name]: value, errors: errors}); // повторно рендерим з перевіреними даними
        }
        else
            this.setState({[name]: value}); // повторно рендерим наш інпут з новим значенням
    }
    render() {
        const {errors} = this.state;
        return ( /*Тіпа рендерим все що ми вертаєм*/
            <div className="row">
                <h1 className="text-center">Вхід на сайт</h1>
                <div className="offset-md-3 col-md-6">
                    <form onSubmit={this.onSubmitHandler}>
                        <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="email"
                            label="Пошта"
                            value={this.state.email}
                            error={errors.email}
                            onChange={this.onChangeHandler}
                         />

                        <InputTextField /*Спеціальний клас, якій ми зробили, в якій ми записуєм данні*/
                            field="password"
                            label="Пароль"
                            value={this.state.password}
                            error={errors.password}
                            onChange={this.onChangeHandler}
                            type="password"
                         /> 
                        <button type="submit" className="btn btn-dark">Вхід</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginPage