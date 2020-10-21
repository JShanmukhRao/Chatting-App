import React, { Component } from 'react'
import { Segment, Header, Icon, Input } from 'semantic-ui-react';


class MessageHeader extends Component
{

    render()
    {
        const {channel,userCount} =this.props;
        return(
            <Segment clearing>
               <Header fluid as="h2" floated="left" ><span>{channel}
                <Icon name="star outline" size="large" /></span>
                <Header.Subheader>{userCount}</Header.Subheader>
                </Header>
                
                <Header floated="right">
                <Input size="mini"  icon="search" iconPosition="right" placeholder="Search Message" />                

                </Header>
            </Segment>
        );
    }
}
export default MessageHeader;