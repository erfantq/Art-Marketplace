import * as yup from 'yup';

// var passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
var requiredTxt = 'Please enter a value!'
// var emailTxt = 'لطفا ایمیل را به درستی وارد کنید'
var passwordTxt = 'Enter at least 5 characters and a special letter'
// var confirmPasswordTxt = 'رمز عبور مطابقت ندارد'
// password : yup.string().min(5,"").matches(passwordRegEx,{"message":passwordTxt}).required(requiredTxt)

export const LoginSchema = yup.object().shape({
    username : yup.string().required(requiredTxt),
    password : yup.string().required(requiredTxt)
})

export const RegisterSchema = yup.object().shape({
    username : yup.string().required(requiredTxt),
    password : yup.string().required(requiredTxt),
    role : yup.string().required("Please select a role")
})

export const CreateArtworkSchema = yup.object().shape({
    name : yup.string().required(requiredTxt),
    price : yup.string().required(requiredTxt),
    number : yup.string().required(requiredTxt),
})

export const WalletChargeSchema = yup.object().shape({
    charge : yup.string().required("Please enter an amount")
})


// export const CreateUserSchema = yup.object().shape({
//     fName : yup.string().required(requiredTxt),
//     lName : yup.string().required(requiredTxt),
//     email : yup.string().email(emailTxt).required(requiredTxt),
//     password : yup.string().min(5,"").matches(passwordRegEx,{"message" : passwordTxt}).required(requiredTxt),
//     confirmPassword :yup.string().oneOf([yup.ref('password'),null],confirmPasswordTxt) 
// })