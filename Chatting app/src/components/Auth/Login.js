import React, { Component } from 'react';
import {Grid,Form, Segment,Header, Button, Icon, Message  } from 'semantic-ui-react'
import '../App.css'
import firebase from '../../firebase'
import { Link } from 'react-router-dom';

 class Login extends Component{

    state={
     
     email:'',
     password:"",
     loading:false,
     error:[]
    }
    
    isFormValid=()=>{
      let err=""
        if(!this.isFormEmpty(this.state))
        {
          err={message:"Fill in all fields"}
            this.setState({error:this.state.error.concat(err)});
            return false;
        }else{
            return true;
        }
    
    }
    isFormEmpty({email,password}){
        return  email.length && password.length ;
    }
    
    handelChange=event =>{
        this.setState({ [event.target.name]:event.target.value });
    }
    
  displayErrors = errors =>
  errors.map((error, i) => <p key={i}>{error.message}</p>);
    handelSubmit = event =>{
         
        if(this.isFormValid()){
          event.preventDefault();
          this.setState({ error: [], loading: true });

            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(singedInUser =>{
                console.log(singedInUser);
                this.setState({loading:false});
            })
            .catch(err =>{
                console.log(err);
                this.setState({error:this.state.error.concat(err),loading:false})
            });
         }

        
    };
    render(){
        const{email,password,error,loading}=this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="login" >
                <Grid.Column style={{maxWidth:450}}>
                <Header as="h2" icon color="orange" textAlign="center" >
                    <Icon name="globe"/>
                    Login to ChaatTime
                </Header>
                <Segment inverted color="grey" >
                <Form onSubmit={this.handelSubmit} size="large" >
                <Form.Input className="form-body" name="email" icon="mail" placeholder="Email" iconPosition="left" type="email"  onChange={this.handelChange} value={email}/>

                <Form.Input  name="password" icon="lock" placeholder="Password" iconPosition="left" type="password"  onChange={this.handelChange} value={password}/>
                
                <Button disabled={loading} className={loading?'loading':''}fluid size="large" color="orange" >Login</Button>
                </Form>
                </Segment>
                <Segment  inverted color="grey">
                    Don't have an account? <Link to="/register" >Register</Link> 
                </Segment>
        {error.length>0 && <Message error ><h3>Error</h3> {this.displayErrors(error)}</Message>}
                </Grid.Column>
            </Grid>
        );
    }
 }
 export default Login;