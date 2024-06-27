import {useState, useContext} from 'react';

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';

import {UserContext} from '../../contexts/user.context';

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm  = () => {

    const [formFields, setFormFields] = useState( defaultFormFields );
    const {
        email,
        password
    } = formFields;

    // console.log( formFields );

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields( defaultFormFields );
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log( response );

            // setCurrentUser( response.user );
            resetFormFields();
        }
        catch(error) {
            console.log( error );

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({ ...formFields, [name]: value});
    }    
    
    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log( response);
        createUserDocumentFromAuth( response.user );
        resetFormFields();
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={ handleSubmit }>

                <FormInput 
                    label="Email"
                    type="email" 
                    required={true}
                    onChange={handleChange} 
                    name="email"
                    value={email}>
                </FormInput>

                <FormInput 
                    label="Password"
                    type="password" 
                    required={true}
                    onChange={handleChange} 
                    name="password"
                    value={password}>
                </FormInput>

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                <button onClick={logGoogleUser}>
                    Sign in with Google Popup
                </button>
            </form>
        </div>
    );
}

export default SignInForm;