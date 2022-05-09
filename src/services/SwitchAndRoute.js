import { useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import TableList from "../components/TableList";
import TableCreation from "../components/TableCreation";
import Table from "../components/Table";
import { Switch, Route } from "react-router-dom";
import React, { Component }  from 'react';

const SwitchAndRoute = () =>{

    return(
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="" component={Home} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Home}/>
            <Route exact path="/tables" component={TableList}/>
            <Route exact path="/create" component={TableCreation}/>
            <Route exact path="/table/:id" component={Table}/>
        </Switch>
    )
}

export default SwitchAndRoute;