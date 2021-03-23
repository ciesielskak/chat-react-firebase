import React from 'react';
import firebase from "firebase";
import auth from "../firebase/firebase";
import { providerFacebook } from "../firebase/firebase";
import googlePic from '../images/googlelogin.svg';
import FacebookPic from '../images/f_logo_RGB-White_58.png';
import { useStateValue } from "../Context-Reducer/StateProvider";


export const ChatLogin = () => {
    const [state, dispatch] = useStateValue();
    const {user, screen, sidebar} = state;
    const SignInWithGoogle = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                const providerGoogle = new firebase.auth.GoogleAuthProvider();
                return auth.signInWithPopup(providerGoogle)
                    .then((result ) => {
                        dispatch({
                            type: 'setUser',
                            user: result.user
                        })
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const SignInWithFacebook = () => {
        auth.signInWithPopup(providerFacebook)
            .then((result) => {
                dispatch({
                    type: 'setUser',
                    user: result.user
                })

            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className='chat__login'>
            <div className='chat__login__card'>
            <h2>Przejdź do czatu:</h2>
                <button onClick={SignInWithGoogle} type='button' className='chat__login_btn google'>
                    <img src={googlePic} alt='googlesignin'/>
                    <span>Zaloguj przez Google</span>
                </button>
                <button onClick={SignInWithFacebook} type='button' className='chat__login_btn fb'>
                    <img src={FacebookPic} alt='facebooklogin' />
                    <span>Zaloguj przez Facebook</span>
                </button>
            </div>

        </div>
    )
}