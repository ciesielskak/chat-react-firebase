import React from 'react';
import { ChatLogin } from "./components/ChatLogin";

import { useStateValue } from "./Context-Reducer/StateProvider";
import { ChatApp } from "./components/ChatApp";
import './sass/index.scss'
import {BrowserRouter, Switch, Route} from "react-router-dom";

export const App = () => {
    const [{ user }] = useStateValue();

    return (
        <>
           <BrowserRouter>
            { !user ? (

                <ChatLogin />




            ) : (



                    <ChatApp />







            )}
           </BrowserRouter>
        </>
    )
}