import {useState, useContext} from 'react';

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss';

import {UserContext} from '../../contexts/user.context';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: ''
}

const SignUpForm  = () => {

    const [formFields, setFormFields] = useState( defaultFormFields );
    const {
        displayName,
        email,
        password,
        confirmedPassword
    } = formFields;

    // console.log( formFields );

    //const { setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields( defaultFormFields );
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmedPassword ) {
            alert('Password and confirmed Password must match');
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword( email, password );
            console.log( response);

            //setCurrentUser( response );
            
            const data = await createUserDocumentFromAuth( response.user, { displayName });
            console.log('data is == ');
            console.log( data );
            resetFormFields();
        }
        catch(error) {
            console.log( error );
            if (error.code == 'auth/email-already-in-use') {
                alert('Email already in use in system.');
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({ ...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password.</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                    label="Display Name"
                    text="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName"
                    value={displayName}></FormInput>

                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}></FormInput>

                <FormInput 
                label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password}></FormInput>

                <FormInput 
                label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmedPassword"
                    value={confirmedPassword}></FormInput>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;