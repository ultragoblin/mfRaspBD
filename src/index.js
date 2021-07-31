import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import Rasp from "./pages/Rasp/Rasp.tsx";
import reportWebVitals from "./reportWebVitals";
import Database from "./pages/Database/Database";
import routing from "./utils/path/routing";
import {store} from "./Redux";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path={routing.rasp} component={Rasp}/>
                    <Route exact path={routing.database} component={Database}/>
                </Switch>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
