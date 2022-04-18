import { useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";


const SwitchAndRoute = () =>{
   
   return(
    <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="" component={Home} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Home}/>
    </Switch>
   )
}

export default SwitchAndRoute;