import React from "react";
//import moment from "moment";
import { Comment,Image } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};
const isOwnMessageRight = (message, user) => {
  return message.user.id === user.uid ? "message__selfRight" : "";
};
const isImage=message=>{
  return message.image;
}
//const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <Comment fluid className={isOwnMessageRight(message, user)}>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)} >
      <Comment.Author as="a">{message.user.name}</Comment.Author>
     {isImage(message)? <Image src={message.image} className="message_Image" />:
       <Comment.Text>{message.content}</Comment.Text>

     }
    </Comment.Content>
  </Comment>
);

export default Message;
