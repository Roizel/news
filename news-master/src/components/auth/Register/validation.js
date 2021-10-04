export function validationFields(items) { /*Получаємо данні з реєстрації*/
    let errors={};
    const { email, fio, password, confirmPassword} = items;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; /*І так ясно для чого і що це*/

    if (!regex_email.test(email.trim())) errors.email = "Не правильний формат електронної пошти!";

    if(fio.trim()=='') /*Якщо не пусте*/
    {
        errors={
            ...errors, /*Закідуєм в помилкі*/
            fio: "Поле ПІБ пуста"
        }
    }

    if(password.trim()=='')
    {
        errors={
            ...errors, /*Закідуєм в помилкі*/
            password: "Поле пароль пуста"
        }
    }
    if (confirmPassword !== password) errors.confirmPassword = "Повтор паролю не співпадає!";

    return errors;
}