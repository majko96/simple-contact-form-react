import * as Yup from 'yup';


function getDefaultOptions(o) {
    return {
        required: o?.required || 'Povinný údaj',
        phoneNotValid: o?.phoneNotValid || 'Nesprávne čislo',
        emailNotValid: o?.emailNotValid || 'Nesprávny email',
    };
}

function getPhoneSchema(options) {
    return Yup.string().matches(
        /^[0]{1}[0-9]{1,9}$|^[+]+[0-9]+$/,
        options.phoneNotValid
    );
}

export function getContactModalSchema(_options)
    {
    const options = getDefaultOptions(_options);
    return Yup.object({
        email: Yup.string()
            .email(options.emailNotValid)
            .required(options.required),
        phone: getPhoneSchema(options)
            .required(options.required),
        message: Yup.string()
            .required(options.required),
    });
}