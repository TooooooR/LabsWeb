import * as Yup from "yup";

const regx = {
    name: /^[а-яА-Яa-zA-Z]{2,20}$/,
    phone: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
};

export const schemas = {
    custom: Yup.object().shape({
        firstname: Yup.string()
            .matches(regx.name, "Ім'я може містити лише літери (від 2 до 20 символів).")
            .required("Ім'я є обов'язковим."),
        lastname: Yup.string()
            .matches(regx.name, "Прізвище може містити лише літери (від 2 до 20 символів).")
            .required("Прізвище є обов'язковим."),
        email: Yup.string()
            .matches(regx.email, "Некоректна електронна пошта.")
            .required("Електронна пошта є обов'язковою."),
        phone: Yup.string()
            .matches(regx.phone, "Номер телефону повинен складатися з 10 цифр.")
            .required("Номер телефону є обов'язковим."),
        address: Yup.string()
            .min(10, "Адреса повинна містити мінімум 10 символів.")
            .max(100, "Адреса не може перевищувати 100 символів.")
            .required("Адреса є обов'язковою."),
    }),
};

export const initValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
};
