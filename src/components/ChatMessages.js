import React, { useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const Message = ({message, timestamp, username, userimage, id, removeMsg, file}) => {
    const [popup, setPopUp] = useState(false)

    return (
        <div className='chat__message' id={id} onDoubleClick={() => setPopUp(prevState => !prevState)}>
            <img src={userimage} alt='userimage'/>
            <div className='chat__message__info'>
                <h4>{username} <span
                    className='chat__message__timestamp'>{new Date(timestamp?.toDate()).toLocaleString()}</span>
                </h4>
                <p>{message}</p>

                {file &&
                <>
                    <p className='openFile'>Otwórz plik:</p>
                    <a className='fileLink' href={file} target='_blank'>{file}</a>
                </>
                }

            </div>
            {popup && <DeleteForeverIcon id={id} onClick={removeMsg} className='chat__message__deleteBtn'/>}
        </div>
    )
}