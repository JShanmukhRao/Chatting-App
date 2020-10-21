import React, { Component } from 'react';

import ReactDOM from 'react-dom';
 import App from './components/App'
 import NotFound from './components/NotFound'
 import Login from './components/Auth/Login'
 import Register from './components/Auth/Register'
 import 'semantic-ui-css/semantic.min.css'
 import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
 import firebase from'firebase'
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import {setUser,clearUser} from './actions'
import  Spinner  from './Spinner';
//import {composewithDevTools} from 'redux-devtools-extension'
const store=createStore(rootReducer);
class root extends Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user)
            {
                this.props.setUser(user)
               this.props.history.push('/');
               console.log("set");
            }
            else{

                this.props.history.push('/login');
                this.props.clearUser();
                console.log("del");
            }
        });
    }
    render(){
        return this.props.isLoading ?<Spinner />: (
        
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route  component={NotFound} />
            </Switch>
        
    );
    }

}
const mapStateFromProps=state=>({
    isLoading:state.user.isLoading
})
const RootwithRouter= withRouter(connect(mapStateFromProps,{setUser ,clearUser})(root));
ReactDOM.render(
    <Provider store={store}>
    <Router>
        <RootwithRouter />
    </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



