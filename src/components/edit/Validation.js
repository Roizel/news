import * as Yup from 'yup';

const validationFields= () => { /*Валідуємо данні за допомгою бібліотекі Yup*/

    return Yup.object({
        // валідація пошти
        email: Yup.string()
               .email('Не коректно вказана пошта') //перевірки чи формат уведений правильно
               .required("Вкажіть пошту"), // перевірка чи поле не пусте

        fio: Yup.string()
               .required("Вкажіть ФІО")
               .min(3, 'ФІО має містити мінімум 3 символа.')
    });
}
export default validationFields;