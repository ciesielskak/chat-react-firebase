import React, { useEffect, useState } from 'react';
import { useStateValue } from "../Context-Reducer/StateProvider";
import { useParams } from "react-router";
import {db} from '../firebase/firebase';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactScrollableFeed from 'react-scrollable-feed';
import { Message } from "./ChatMessages";
import { ChatInput } from "./ChatInput";


export const ChatScreen = () => {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [state, dispatch] = useStateValue();
    const {user, screen, sidebar} = state;


    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
        }
        db.collection('rooms').doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setRoomMessages(snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })))

    }, [roomId]);

    const removeMsg = (e) => {

        const currentTargetID = e.currentTarget.id

        console.log(currentTargetID)
        db.collection("rooms")
            .doc(roomId)
            .collection('messages')
            .doc(currentTargetID)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
            console.error("Error removing document: ", error);
        });


    }

    const backToSidebar = () => {
        dispatch({
            type: 'showSidebar'
        })
    }

    return (
        <>
            {roomId ?
                <div className={sidebar ? 'chat__screen__component mobileHidden' : 'chat__screen__component'}>

                    <div className="chat__screen__header">
                        <div className="chat__screen__header__left">
                            <h4 className='chat__screen__header_channelName'>
                                <strong>#{roomDetails?.name}</strong>
                            </h4>
                        </div>
                        <div className='chat__screen__header__right'>
                            <div onClick={backToSidebar} className='return__to__sidebar largeScreenHidden'>
                                <ArrowBackIcon />
                                <p>Wróć</p>
                            </div>
                        </div>
                    </div>
                    <div className='chat__screen__messages'>
                        <ReactScrollableFeed className='scrollableFeed'>
                            {roomMessages.map(({message, timestamp, username, userimage, id, file}) => (
                                <Message key={id}
                                         id={id}
                                         message={message}
                                         timestamp={timestamp}
                                         username={username}
                                         userimage={userimage}
                                         removeMsg={removeMsg}
                                         file={file}
                                />
                            ))}
                        </ReactScrollableFeed>
                    </div>
                    <ChatInput channelName={roomDetails?.name} channelId={roomId} />
                </div>

                :
                <div className='chat__screen__default mobileHidden'>

                </div>

            }
        </>
    )
}