import React from "react";
import { Segment, Comment, Accordion } from "semantic-ui-react";
import firebase from "../../firebase";

import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    userRef:firebase.database().ref('users'),
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

    displayChannelName=(channel)=>(
      `#${channel.name}`
    )  
    
    userCount=messages=>{
      const unique=messages.reduce((count,message)=>{
      if(!count.includes(message.user.name))
      {
        count.push(message.user.name);
      }
      return count
    },[])
    const plural= unique.length >1 && 1;
      return `${unique.length} user${plural? 's':""} `
    }
  render() {
    const { messagesRef, messages, channel, user } = this.state;

    return (
      <React.Fragment>
        <MessageHeader 
        channel={channel && this.displayChannelName(channel)}
         userCount={user && this.userCount(messages)}
        />

        <Segment clearing>
          <Comment.Group  className="message">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
