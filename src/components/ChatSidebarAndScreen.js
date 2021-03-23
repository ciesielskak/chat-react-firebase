import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router";
import { useStateValue } from "../Context-Reducer/StateProvider";
import { db } from "../firebase/firebase";
import AddIcon from '@material-ui/icons/Add';
import { ChatScreen } from "./ChatScreen";

export const ChatSidebarAndScreen = () => {

    const [channels, setChannels] = useState([])
    const [state, dispatch] = useStateValue();
    const {user, screen, sidebar, searchInput} = state;


    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => (
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        ))

    }, []);

    const addChannel = () => {
        const channelName = prompt('Wpisz nazwę czatu i dodaj go do listy tematów');
        if(channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
    }

    return (
        <div className="chat__sidebar__and__screen">
            <div className={sidebar ? "chat__sidebar__component" : 'chat__sidebar__component mobileHidden'}>
                <div className='chat__channel__box'>
                    <div className='chat__channel__box__addChannel' onClick={addChannel}>
                        <p>Dodaj temat</p>
                        <AddIcon className='chat__channel__box__plusIcon' id='plusIcon' />
                    </div>
                </div>
                <div className='chat__sidebar__component__list'>
                    <ul>
                        {
                            channels.filter((channel) => {
                                if (searchInput === '') {
                                    return channel
                                }
                                else if (channel.name.toLowerCase().includes(searchInput.toLowerCase())) {
                                    return channel
                                }
                            }).map(channel => (
                                <li key={channel.id}>
                                    <SidebarOption title={channel.name} id={channel.id} />
                                </li>
                            ))}

                    </ul>
                </div>
            </div>
            <Switch>
                <Route path='/:roomId?'>
                    <ChatScreen />
                </Route>
            </Switch>
        </div>
    )
}


const SidebarOption = ({ title, id }) => {
    const [state, dispatch] = useStateValue();
    const {user, screen, sidebar} = state;


    const history = useHistory();
    const selectChannel = () => {
        history.push(`/${id}`)
    }

    const showScreen = () => {
        dispatch({
            type: 'showScreen'
        })
    }

    return (

        <div className='chat__sidebar__option' onClick={() => {selectChannel(); showScreen()}}>
            <h4 className='chat__sidebar__option__channel'>
                <span className="chat__sidebar__option__hash">#</span>{title}</h4>
        </div>
    )
}