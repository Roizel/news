export function validationFields(items) { /*Получаємо данні з реєстрації*/
    let errors={};
    const { email, password } = items;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;  /*І так ясно для чого і що це*/

    if (!regex_email.test(email.trim())) errors.email = "Не правильний формат електронної пошти!";

  
    if(password.trim()=='')
    {
        errors={
            ...errors, /*Закідуєм в помилкі*/
            password: "Поле пароль пуста"
        }
    }

    return errors; /*Вертаєм помилкі*/
}