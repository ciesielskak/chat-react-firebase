import React, { useEffect } from "react";
import { ChatLogin } from "./components/ChatLogin";
import { ChatHeader } from "./components/ChatHeader";
import { ChatSidebar } from "./components/ChatSidebar";
import { useStateValue } from "./Context-Reducer/StateProvider";
import { ChatScreen } from "./components/ChatScreen";
import "./sass/index.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import auth from "./firebase/firebase";
export const App = () => {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    const user = auth.currentUser;
    dispatch({
      type: "setUser",
      user: user,
    });
  }, []);

  const [{ user }] = useStateValue();

  return (
    <>
      <BrowserRouter>
        {!user ? (
          <ChatLogin />
        ) : (
          <div className="chat__loggedin">
            <ChatHeader />
            <div className="chat__sidebar__and__screen">
              <ChatSidebar />
              <Switch>
                <Route path="/:roomId?">
                  <ChatScreen />
                </Route>
              </Switch>
            </div>
          </div>
        )}
      </BrowserRouter>
    </>
  );
};
