import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth';

import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    queryUsers
    } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';


const Authentication = () => {

/*     useEffect(
        () => {
            async function fetchData() {
                const response = await getRedirectResult(auth);
                console.log(response);
                if(response) {

                    const userDocRef = await createUserDocumentFromAuth(response.user);
                    console.log( userDocRef );
                }
            }
            fetchData();
        }, []
    ); */


    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log( userDocRef );
    };



    return (
        <div>
            <h1>Sign In Page</h1>
{/*             <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button> */}
            <SignInForm />
            <SignUpForm />
            <br></br>
            <button onClick={queryUsers}>
                Query DB
            </button>
{/*             <br></br>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    );
}

export default Authentication;