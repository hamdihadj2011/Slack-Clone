import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import "./components/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import rootReducer from './reducers'
import {setUser,clearUser} from './actions'
import Spinner from './Spinner'
const store=createStore(rootReducer,composeWithDevTools())


class Root extends React.Component {
  componentDidMount() {
    console.log(this.props.isLoading)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.history.push("/");
      }
      else {
        this.props.history.push('/login')
        this.props.clearUser()
      }
    });
  }
  render() {
    return this.props.isLoading ? <Spinner />:(
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps=state=>({
  isLoading:state.user.isLoading
})
const RootWithAuth = withRouter(connect(mapStateToProps,{setUser,clearUser})(Root));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
