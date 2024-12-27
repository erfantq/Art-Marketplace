import * as yup from 'yup';

// var passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
var requiredTxt = 'Please enter a value!'
var emailTxt = 'Please enter a valid email'
var passwordTxt = 'Enter at least 5 characters and a special letter'
var confirmPasswordTxt = 'Password not match!'
// password : yup.string().min(5,"").matches(passwordRegEx,{"message":passwordTxt}).required(requiredTxt)

export const LoginSchema = yup.object().shape({
    username : yup.string().required(requiredTxt),
    password : yup.string().required(requiredTxt)
})

export const RegisterSchema = yup.object().shape({
    username : yup.string().required(requiredTxt),
    email: yup.string().email(emailTxt),
    password : yup.string().required(requiredTxt),
    role : yup.string().required("Please select a role")
})

export const CreateArtworkSchema = yup.object().shape({
    name : yup.string().required(requiredTxt),
    price : yup.string().required(requiredTxt),
    number : yup.string().min(1).required(requiredTxt),
})

export const WalletChargeSchema = yup.object().shape({
    charge : yup.string().required("Please enter an amount")
})

export const PurchaseSchema = yup.object().shape({
    number : yup.string().required("Please enter an amount")
})

export const ArtworkCommentSchema = yup.object().shape({
    comment : yup.string().required("Please write a comment")
})

// password : yup.string().min(5,"").matches(passwordRegEx,{"message" : passwordTxt}).required(requiredTxt),

export const UpdateProfile = yup.object().shape({
    first_name: yup.string().max(20),
    last_name: yup.string().max(20),
    email: yup.string().email(emailTxt).required(emailTxt),
    address : yup.string(),
    username : yup.string().required(requiredTxt),
    password : yup.string().required(requiredTxt),
    // confirmPassword :yup.string().oneOf([yup.ref('password'),null],confirmPasswordTxt) 
})