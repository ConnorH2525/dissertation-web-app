import React from "react"
import Signup from "./authentication/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./authentication/Profile"
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"
import Dashboard from "./groups/Dashboard"
import Viewer from "./viewer/Viewer"
import "../style.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Groups */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/group/:groupId" component={Dashboard} />

          {/* Viewer */}
          <PrivateRoute exact path="/viewer/:groupId" component={Viewer} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Authentication */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
