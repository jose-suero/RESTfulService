const { ModelMapperError } = require('lib/model-mapper/classes/model-mapper-error');

module.exports = {
    signupEmailInViewmodel: {
        email: {
            type: 'direct',
            regExp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            errorMessage: 'The email provided is invalid.',
            required: true
        },
        password: {
            type: 'direct',
            required: true,
            minLength: 5
        },
        confirmPassword: {
            type: 'custom',
            map: (sourceObject, key, mapModelSpec) => {
                const { password, confirmPassword } = sourceObject;

                if (password && confirmPassword && password.toString() == confirmPassword.toString()) {
                    return confirmPassword.toString();
                }
                
                //TODO: check password policy here

                throw new ModelMapperError(
                    'Please verify your password. Make sure you confirmed the value entered.',
                    key,
                    mapModelSpec);
            }
        },
        firstName: { type: 'direct', required: true, minLength: 3 },
        lastName: { type: 'direct', required: true, minLength: 3 },
    }
}