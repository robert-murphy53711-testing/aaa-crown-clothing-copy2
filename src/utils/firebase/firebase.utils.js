import {initializeApp} from'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';

import {
  getFirestore, 
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgyE2YSXdm-2UucVzugbYogFRUvEV6PLc",
  authDomain: "crwn-clothing-db-98399.firebaseapp.com",
  projectId: "crwn-clothing-db-98399",
  storageBucket: "crwn-clothing-db-98399.appspot.com",
  messagingSenderId: "359914001696",
  appId: "1:359914001696:web:3768b4eddd73de1b6ab345"
};


/*     // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzKAPUBsA66q_frfNYVpRQb-LmKg_sBQE",
  authDomain: "crwn-clothing-web-b644d.firebaseapp.com",
  projectId: "crwn-clothing-web-b644d",
  storageBucket: "crwn-clothing-web-b644d.appspot.com",
  messagingSenderId: "677955531319",
  appId: "1:677955531319:web:4c0dec2e473c727ff945b2"
};

/* // Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyChHn15pAJF1AebBoN3iRKyzqHUcTs5pm8",
  
    authDomain: "crwn-clothing-db-32d24.firebaseapp.com",
  
    projectId: "crwn-clothing-db-32d24",
  
    storageBucket: "crwn-clothing-db-32d24.appspot.com",
  
    messagingSenderId: "991156009723",
  
    appId: "1:991156009723:web:947f46fbd2b0cf791e0e5e"
  
  }; */
  

  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig); 

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


  export const db = getFirestore();



  export const queryUsers = async () => {
      // const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImExODE4ZjQ0ODk0MjI1ZjQ2MWQyMmI1NjA4NDcyMDM3MTc2MGY1OWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY3J3bi1jbG90aGluZy13ZWItYjY0NGQiLCJhdWQiOiJjcnduLWNsb3RoaW5nLXdlYi1iNjQ0ZCIsImF1dGhfdGltZSI6MTcwOTIzMDc4OSwidXNlcl9pZCI6IktBVkxWSFdMSFBSMEhIS1BBcGY1SnhIMTJsTzIiLCJzdWIiOiJLQVZMVkhXTEhQUjBISEtQQXBmNUp4SDEybE8yIiwiaWF0IjoxNzA5MjMwNzg5LCJleHAiOjE3MDkyMzQzODksImVtYWlsIjoicDdAcC5jYyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwN0BwLmNjIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.BPZvteUXRr-YXWGdSy4N-_E0KOMaFPQOA0bGncBm8YvKfj9fccRVHBh6EFUfjg_hS7s7B1JgePMe-clkSe-eaYKx2aorUe04vHlOG8rx9PzthQtT4NHOvja_mdySrF2Z9omcVFxUPIlIzcbFnYm4WiIfrLynHMQ_y0uibT9_6LZ1Vb0bsJu5vpJkCZ3wk8vLZay-wQs11-ATalTF_61isiPBvqYIlEv6Z_LvlekfW9eu7AOTg7HL1oB0IQpOPmPxfRpJZ2F6IBEMcYr4cfppWscS3Q_hGCrAvGokTIv4bb7BFvKftm_9oTMMax3gjZDhD0atKuTwf-m_MrYXh3SZxg';
      // const userDocRef = doc(db, 'users', userAuth.uid);
      // console.log( userDocRef);

      const usersRef = await collection(db, "users");
      console.log('retrieving users');
      console.log( usersRef );
  }


  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    console.log( userAuth);
    // 
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log( userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log('snapshot');
    console.log(userSnapshot);
  

    console.log('user exists?');
    console.log( userSnapshot.exists() );
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInfo
        });
      }
      catch(error) {
        console.log('error creating the user', error.message);
      }
    }

    console.log( userDocRef);
    return userDocRef;
  };


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    console.log('calling create user');
    console.log('auth == ');
    console.log( auth );
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log( response );
    //const data = createUserDocumentFromAuth( response.user );
    //console.log( data );
    return response;
  }


  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    console.log('calling sign in user');
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log( response );
    //const data = createUserDocumentFromAuth( response.user );
    //console.log( data );
    return response;
  }

  export const signOutUser = async () => {
    console.log('signOutUser');
    return await signOut( auth );
  }

  export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
  }