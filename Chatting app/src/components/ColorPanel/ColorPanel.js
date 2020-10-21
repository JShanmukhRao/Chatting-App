import React, { Component } from 'react'
import { Sidebar, Button, Divider, Menu } from "semantic-ui-react";
class ColorPanel extends Component{
    render(){
        return(
           <Sidebar
           as={Menu}
           visible
           icon="labeled"
           inverted
           width="very thin"
           vertical
           >
           <Divider />
           <Button icon="add" size="tiny" color="blue" />
           

          </Sidebar>
        );
    }
}
export default ColorPanel;