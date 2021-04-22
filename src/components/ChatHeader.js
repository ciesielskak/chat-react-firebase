import React from 'react';
import { useHistory } from "react-router";
import { useStateValue } from "../Context-Reducer/StateProvider";
import auth from "../firebase/firebase";
import Avatar from "@material-ui/core/Avatar";

export const ChatHeader = () => {
    const history = useHistory();

    const backToLogin  = () => {

        history.push('/');


    }
    const [state, dispatch] = useStateValue();
    const {user, searchInput} = state;


    const signOutUser = () => {

        auth.signOut().then(() => {
            dispatch({
                type: 'setUser',
                user: null
            })
        })
        .then(() => {
            dispatch({
                type: 'showSidebar'
            })
        })
            .catch((error) => {
                alert(error.message)
            })

    }
    return (
        <div className='header__component'>
            {
                !user?
                    <Avatar className='header__user__avatar' alt='userimage'>
                    </Avatar>
                    :
                    <img src={user?.photoURL} alt='userimage' />
            }
            <div className='header__username_search'>
                <h2>Witaj {user.displayName}!</h2>
                <input type='text'
                       placeholder='Wyszukaj czat...'
                       value={searchInput}
                       onChange={(e) => dispatch({type: 'searchTopic', payload: e.target.value})}/>
            </div>
            <p onClick={() => {signOutUser(); backToLogin()}}>Wyloguj</p>
        </div>

    )
}