import React from 'react';
import ReactDOM from 'react-dom';

import  auth from './firebase/firebase';

import { App } from './App';
import { reducer, initialState } from "./Context-Reducer/reducer";
import { StateProvider } from "./Context-Reducer/StateProvider";

auth.onAuthStateChanged(() =>{
  ReactDOM.render(

    <StateProvider initialState={initialState} reducer={reducer}>
            <App />
    </StateProvider>,
  
  document.getElementById('root')
  );
})



