import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
import UserPanel from './UserPanel'
class SidePanel extends Component{
    render(){
        return(
            <Menu 
             size="large"
             inverted
             vertical
             fixed="left"
             style={{background:"#4c3c4c"}}
             >
            <UserPanel currentUser={this.props.currentUser} currentChannel={this.props.currentChannel} />
            </Menu>
        );
    }
}
export default SidePanel;