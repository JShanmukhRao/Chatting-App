import React, { Component } from 'react';
import { Modal, Button, Input } from 'semantic-ui-react';
//import * as mime from 'react-native-mime-types';
class FileUpload extends Component{

    state={
        file:null,
        authorised: /(\.jpg|\.jpeg|\.png)$/i
    }
    updateFile=event=>{
     const file=event.target.files[0];
     if(file)
     {
        this.setState({file});

     }
    }
    sendFile=()=>{
        const {file}= this.state;
        const {uploadFile, closeModal}=this.props;
        if(file!=null)
        {
            if(this.isAuthorised(file.name))
            {
                const metadata={
                    contentType:"image"//mime.lookup(file.name)

                };
                uploadFile(file,metadata);
                closeModal();
                this.clearFile();
            }
            else{
                console.log("File Not Valid");
            }
        }
    }
    
    clearFile=()=>{
        this.setState({file:null})
    }

   isAuthorised=filename=>this.state.authorised.exec(filename);
      
    render(){
        const {open, closeModal}= this.props;
        return(
            <Modal basic open={open} onClose={closeModal} >
                <Modal.Header>
                    Select an Image file
                </Modal.Header>
            <Modal.Content>
               <Input
                  fluid
                 label="File types: jpg,png"
                 type="file"
                 onChange={this.updateFile}
                 name="file"
                 accept="image/*"
                />
            </Modal.Content>
               <Modal.Actions>
               <Button
               onClick={this.sendFile}
                     color="green"
                     icon="checkmark"
                     content="Send"
                     inverted

                 />
                  <Button
                     color="red"
                     icon="cancel"
                     content="cancel"
                     onClick={closeModal}
                     inverted


                 />
                 
               </Modal.Actions>

                
            </Modal>
        );
    }
}
export default FileUpload;