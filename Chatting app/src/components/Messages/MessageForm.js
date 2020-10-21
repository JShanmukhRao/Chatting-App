import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import FileUpload from "./FileUpload";
import {v4 } from 'uuid'
import ProgressBar from './ProgressBar'

class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    percentUpload:0,
    modal:false,
    storageRef:firebase.storage().ref(),
    uploadFile:"",
    uploadTask:null
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = (fileUrl=null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
     
      
    };
    if(fileUrl)
    {
      message['image']=fileUrl
    }
    else
    {
      message['content']= this.state.message
    }
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };
  openModal=()=>{
        this.setState({modal:true})
  }
 
  closeModal=()=>{
     this.setState({modal:false})
    }
    uploadFile=(file,metadata)=>{

      const ref=this.props.messagesRef;
      const pathUpload=this.props.currentChannel.id;
      const filePath=`child/public/${v4()}.jpg`
      console.log(v4())
      this.setState({
        uploadFile:'uploading',
        uploadTask:this.state.storageRef.child(filePath).put(file,metadata) 
      },

      ()=>{
        this.state.uploadTask.on('state_changed',snap=>{
          const percentUpload=Math.round(snap.bytesTransferred/snap.totalBytes)*100
          this.setState({percentUpload})
        },
      err=>{
        this.setState({
          errors:this.state.errors.concat(err),
          uploadFile:'err',
          uploadTask:null
        })
      },
      () =>{
        this.state.uploadTask.snapshot.ref.getDownloadURL().then(download=>{
          this.sendFileMessage(download,ref,pathUpload)
          this.setState({uploadFile:""})
          console.log('sucess')
        })
        .catch(err=>{
          this.setState({
            errors:this.state.errors.concat(err),
            uploadFile:'err',
            uploadTask:null
          })
        })
      }
        )}
      );
    }

sendFileMessage=(download,ref,pathUpload)=>{
  ref
  .child(pathUpload)
  .push()
  .set(this.createMessage(download))
}

  render() {
    const { errors, message, loading,modal, percentUpload,uploadFile } = this.state;

    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
             
            disabled={uploadFile==""? false:true}
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
          
        </Button.Group>
        <FileUpload  
        open={modal}
        closeModal={this.closeModal}
        uploadFile={this.uploadFile}
      />
      <ProgressBar
          uploadFile={uploadFile}
          percentUpload={percentUpload}
          />
      </Segment>
     
    );
  }
}

export default MessageForm;
