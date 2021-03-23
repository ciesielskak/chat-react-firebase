import React from 'react';
import { ChatHeader } from "./ChatHeader";
import { ChatSidebarAndScreen } from "./ChatSidebarAndScreen";

export const ChatApp = () => {
    return (
        <div className='chat__loggedin'>
            <ChatHeader />
            <ChatSidebarAndScreen />
        </div>
    )
}