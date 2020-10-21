import React, { Component } from 'react'
import { Grid, GridColumn, GridRow, Header, Icon, HeaderContent, Dropdown, Image } from 'semantic-ui-react';
import firebase from 'firebase';
import Channels from './Channels';

class UserPanel extends Component{
    state={
        user:this.props.currentUser
    }
dropDownOption=()=>
       [
           {
               key:"user",
            text:(<span>Sign in as<strong>{this.state.user.displayName}</strong></span>)
            ,disabled:true
           },
           {
            key:"profile",
             text:<span>Change Profile Pic</span>
           },
           {
            key:"signout",
            text:<span onClick={this.handleClick} >Sign Out</span>
           }
       ]
handleClick=()=>{
    firebase
    .auth()
    .signOut()
    .then(()=>{
        console.log("Sign Out");
    })
    .catch(()=>{
        console.log("Error in SignOut");
    })
}
    
render(){
    const {user}=this.state;
    return(
        <Grid style={{background:"#4c3c4c"}}>
            <GridColumn>
                <GridRow style={{padding:"1.2em",margin:0}} > 
                     <Header as="h3" inverted floated="left" >
                           <Icon name="code" />
                           <HeaderContent>
                               Read Count
                           </HeaderContent>
                       </Header>
                </GridRow>
                <Header as="h4" inverted style={{padding:'0.25em'}} >
                    <Dropdown
                    trigger={
                        <span>
                        <Image src={user.photoURL} />
                       
                            {this.state.user.displayName}
                            </span>
                    } options={this.dropDownOption()}
                    
                    />
                </Header>
                <Channels currentUser={user} currentChannel={this.props.currentChannel}/>
            </GridColumn>
        </Grid>
    );
}

}
export default UserPanel;