import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from "./Home"
import Signup from "../user/signup"
import Signin from '../user/signin'
import Menu from '../core/menu'
import Profile from "../user/profile"
import Users from "../user/users.js"
import EditProfile from "../user/EditProfile.js"
import PrivateRoute from "../auth/PrivateRoute"
const MainRouter =() =>(
    <div>
        <Menu/>
        <Switch>
                       
                        <Route exact path='/' component = { Home }/>
                        <Route exact path='/users' component = { Users }/>
                        <Route exact path='/signup' component = { Signup }/>
                        
                        <Route exact path='/signin' component = { Signin  }/>
                        <PrivateRoute exact path='/singleUser/edit/:userId' component = { EditProfile  }/>
                        <PrivateRoute exact path='/singleUser/:userId' component = { Profile  }/>
                     
        </Switch>
        
    </div>
)
export default MainRouter;