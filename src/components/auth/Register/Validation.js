import * as Yup from 'yup';

const validationFields= () => { /*Валідуємо данні за допомгою бібліотекі Yup*/

    return Yup.object({
        // валідація пошти
        Email: Yup.string()
            .email('Не коректно вказана пошта') //перевірки чи формат уведений правильно
            .required("Вкажіть пошту"), // перевірка чи поле не пусте

        Phone: Yup.string()
            .required('Вкажіть телефон.')  // перевірка чи поле не пусте
            .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'Телефон повинен мати формат 38 (000)-000-00-00'),//перевірки чи формат уведений правильно
            
        Login: Yup.string()
            .required("Вкажіть логін") // перевірка чи поле не пусте
            .min(6, 'Логін має містить мінімум 6 символів.'), //перевірки чи кількість символів уведена правильно

        Password: Yup.string()
            .required('Вкажіть пароль.')  // перевірка чи поле не пусте
            .min(8, 'Пароль має містить мінімум 8 символів.') //перевірки чи кількість символів уведена правильно
            .matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'), //перевірки чи формат уведений правильно

        ConfirmPassword: Yup.string()
            .oneOf([Yup.ref('Password'), null], 'Не співпадають паролі') // перевірка чи паролі одинакові
            .required("Повтор пароля є обов'язковим"), // перевірка чи поле не пусте

        Photo: Yup.mixed()
        .required('Добавте фото') // перевірка чи поле не пусте
        .test('fileSize', "Файл завеликий", value => ((value.size / 1024) / 1024) <= 10) // перевірка чи хайл не більше 10 мб
        .test('fileType', "Потрібно вибрати фото", value => value.type.match(/^image\//)), // перевірка чи файт фото
        
            // .required('Добавте фото') // перевірка чи поле не пусте
            // .test("fileSize", "The file is too large", (value) => {
            //     return value && value[0].size <= 2000000;
            // })
            // .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp", (value) => {
            //     return value && (
            //         value[0].type === "image/jpeg" ||
            //         value[0].type === "image/bmp" ||
            //         value[0].type === "image/png"
            //     );
            // }),
             // перевірка чи файл фото
        
    });
}
export default validationFields;







// export function validatonFields(items)
// {
//     let errors={};
//     const {Email, Login, Password, ConfirmPassword, Phone} = items; //оголошуємо потрібні нам поля
//     const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; // регулярний вираз на електронку
//     const regex_phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ // регулярний вираза на телефон


//     if (!regex_email.test(Email.trim())) // перевіряємо пошту на валідність через регулярний вираз
//     {
//         errors ={
//             ...errors,
//             Email: "Вкажіть коректну пошту"
//         }
//     } 

//     if (!regex_phone.test(Phone.trim())) // перевіряємо номер на валідність через регулярний вираз
//     {
//         errors ={
//             ...errors,
//             Phone: "Вкажіть коректний номер"
//         }
//     }


//     if(Object.keys(Login).length < 6)  // перевіряємо наш логін на наявність і кількість символів
//     {
//         errors = {
//             ...errors,
//             Login: "Вкажіть коректний логін (Логін повинен містити мінімум 6 символів)!"
//         }
//     }


//     if(Object.keys(Password).length < 8) // перевіряємо наш пароль на наявність і кількість символів 
//     {
//         errors= { 
//             ...errors, 
//             Password: "Вкажіть коректний пароль (Пароль повинен містити мінімум 8 символів)!"
//         }
//     }

//     if (ConfirmPassword !== Password) // перевіряємо чи повторення паролю співпадає з паролем
//     {
//         errors ={
//             ...errors,
//             ConfirmPassword: "Паролі не співпадають!"
//         }
//     }

//     if (ConfirmPassword.trim() == '') // перевіряємо повторення паролю на наявність символів 
//     {
//         errors ={
//             ...errors,
//             ConfirmPassword: "Повтор паролю не може бути пустим!"
//         }
//     }

//     return errors;    // повертаємо всі помилки які виявили під час перевірок
// }