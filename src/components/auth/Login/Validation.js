import * as Yup from 'yup';

const validationFields= () => { /*Все те саме що і у реєстрації*/
    return Yup.object({
        email: Yup.string()
            .email('Не коректно вказана пошта')
            .required("Вкажіть пошту"),

        password: Yup.string()
            .required('Вкажіть пароль.') 
            .min(4, 'Пароль має містить мінімум 8 символів.')
            .matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'),
    });
}
export default validationFields;