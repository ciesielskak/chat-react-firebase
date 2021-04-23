import React, { useState } from 'react';
import {db} from "../firebase/firebase";
import 'firebase/firestore';
import firebase from 'firebase/app';
import {useStateValue} from '../Context-Reducer/StateProvider'
import SendIcon from '@material-ui/icons/Send';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from "emoji-mart";
import { firebaseApp } from "../firebase/firebase";


export const ChatInput = ({ channelName, channelId }) => {
    const [input, setInput] = useState('');
    const [{user}, dispatch] = useStateValue();
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [fileUrl, setFileUrl] = useState(false)

    const sendMessage = (e) => {
        e.preventDefault();
        if (channelId) {
            db.collection('rooms')
                .doc(channelId)
                .collection('messages')
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    username: user.displayName,
                    userimage: user.photoURL,
                    file: fileUrl
                })

        }
        setInput('');
    }

    const addEmoji = e => {
        let emoji = (e.native);

        setInput(input + emoji)
    }

    const showEmojis = () => {
        setEmojiVisible(prevState => !prevState)
    }
    const selectFile = async e => {
        const file = e.target.files[0];

        const storageRef = firebaseApp.storage().ref();

        if (file === undefined) {
            setFileUrl(false)
        }
        else {
            const fileRef = storageRef.child(file.name);

            await fileRef.put(file)
            setFileUrl(await fileRef.getDownloadURL())
        }


    }




    return (
        <div className='chat__input'>
            <form onSubmit={sendMessage}>
                <div className='chat__input__textfield'>
                    <input
                        type='text'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder='Wpisz wiadomość' />
                    <span className='chat__input__emojiIcon'
                          onClick={showEmojis}>
                       {String.fromCodePoint(0x1f600)}
                   </span>
                    <button type='submit'>
                        <SendIcon className='chat__input__sendicon'/>
                    </button>
                </div>
                <input id="file__input"
                       type="file"
                       onChange={selectFile}
                />
            </form>

            <span style={emojiVisible ?{
                    position: "absolute",
                    bottom: 120,
                    right: 0,
                    cssFloat: "right",
                    marginLeft: "200px"
                } :
                {
                    display: 'none'
                }}>
                    <Picker
                        onSelect={addEmoji}
                        emojiTooltip={true}
                        set='apple'/>
                </span>

        </div>
    )
}