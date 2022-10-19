import * as Yup from 'yup';

function getDefaultOptions(o) {
    return {
        required: o?.required || 'Povinný údaj',
        mobileNotValid: o?.mobileNotValid || 'Nesprávne čislo',
        emailNotValid: o?.emailNotValid || 'Nesprávny email',
    };
}

export function getContactModalSchema(_options)
    {
    const options = getDefaultOptions(_options);
    return Yup.object().shape({
        'email': Yup.string()
            .email(options.emailNotValid)
            .when('mobile', {
                is: (mobile) => !mobile || mobile.length === 0,
                then: Yup.string()
                    .required('Aspoň jeden údaj povinný!'),
            }),
        'mobile': Yup.string().matches(
            /^[0]{1}[0-9]{1,9}$|^[+]+[0-9]+$/,
            options.mobileNotValid
        )
            .when('email', {
                is: (email) => !email || email.length === 0,
                then: Yup.string()
                    .required('Aspoň jeden údaj povinný!')
            }),
        message: Yup.string()
            .required(options.required),
    }, ['email', 'mobile'])
    }