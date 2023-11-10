import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { create_new_draft, send_new_email } from '../../../store/actions/emailAction';
import WrapperComponent from './WrapperComponent';
import Button from '@material-ui/core/Button';
import ChipInput from 'material-ui-chip-input';
import TextInput from '../../Contacts/ReusableComponent/TextInput';
import Body from './Body';


export class CreateEmails extends Component {
    constructor(){
        super();
        this.state = {
            emailModal:false,
            from:"",
            to:[],
            cc:[],
            subject:"",
            body:"",
            attachments:[]
        }
    }

    onClose = e => {
        this.setState({
            emailModal:false,
            from:"",
            to:[],
            cc:[],
            subject:"",
            body:"",
            attachments:[]
        })
    }
    onModalToggler = value => e => {
        if( value === false ){
            this.onClose();
        }
        this.setState({
            emailModal:value
        })
    }
    // INPUT HANDLERS
    handleAddChip = (value, name) =>  {
        let data = this.state[name];
        data.push( value );
        this.setState({ [name] : data });
    }
    handleDeleteChip = ( chip, index, name ) => {
        let data = this.state[name];
        data.splice( index, 1 );
        this.setState({ [name] : data });
    }
    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onEditorChangeHandler = e => {
        this.setState({
            body : e.editor.getData()
        });
    }
    onSaveHandler = e => {
        let formData = {
            ccRecipients:this.state.cc.map( data => ({ "emailAddress":{ "name":data, address:data }}) ),
            toRecipients:this.state.to.map( data => ({ "emailAddress":{ "name":data, address:data }}) ),
            subject:this.state.subject,
            body:{
                "content": this.state.body,
                "contentType": "html"
            }
        }
        this.props.create_new_draft(formData);
        // this.onClose();
    }
    onSendHandler = e => {
        let formData = {
            "message":{
                bccRecipients:[],
                ccRecipients:this.state.cc.map( data => ({ "emailAddress":{ "name":data, address:data }}) ),
                toRecipients:this.state.to.map( data => ({ "emailAddress":{ "name":data, address:data }}) ),
                subject:this.state.subject,
                body:{
                    "content": this.state.body,
                    "contentType": "html"
                },
            },
            saveToSentItems:true
        }
        this.props.send_new_email(formData);
        this.onClose();
    }
    onFileSelector = e => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let attachment = {
                "filename": file.name,
                "content":reader.result,
                "encoding":"base64"
            }
            let attachments = this.state.attachments;
            attachments.push(attachment);
            this.setState({ attachments:attachments })
          };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    localProps = {
        onModalToggler:this.onModalToggler,
        handleAddChip:this.handleAddChip,
        handleDeleteChip:this.handleDeleteChip,
        onChange:this.onChange,
        onEditorChangeHandler:this.onEditorChangeHandler,
        onFileSelector:this.onFileSelector,
        onSaveHandler:this.onSaveHandler,
        onSendHandler:this.onSendHandler
    }
    render() {
        return (
            <div>
                <WrapperComponent name={"createEmails"}  { ...this.state } { ...this.localProps }>
                    <div className="email_create_main_container">
                        <div className="email_create_left_container">
                            <BasicEmail {...this.state} { ...this.localProps }/>
                            <Body body={ this.state.body } onChange={ this.onEditorChangeHandler }/>
                        </div>
                        <div className="email_create_right_container">
                            <AttachmentsLabels { ...this.localProps }/>
                        </div>
                    </div>
                </WrapperComponent>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    connectappAuth : state.connectapp.auth,
    connectappEmail : state.connectapp.email
})

export default connect( mapStateToProps, {
    create_new_draft,
    send_new_email
} )( withRouter( CreateEmails ) );


export const BasicEmail = ( props ) => {
    return (
        <>
            <div className="form_group_row">
                <ChipInput label="To" fullWidth name="to" placeholder="Send email to ..." value={props.to} onAdd={(chip) => props.handleAddChip(chip,"to")} onDelete={(chip, index) => props.handleDeleteChip(chip, index, "to")} />
            </div>
            <div className="form_group_row">
                <ChipInput label="CC" fullWidth name="cc" placeholder="Send cc to ..." value={props.cc} onAdd={(chip) => props.handleAddChip(chip,"cc")} onDelete={(chip, index) => props.handleDeleteChip(chip, index, "cc")} />
            </div>
            <div className="form_group_row" style={{ height:"70px" }}>
                <TextInput name="subject" value={ props.subject } onChange={ props.onChange } placeholder="Email Subject here. . . " label="Subject" required={ true } />
            </div>
        </>
    )
}

export const AttachmentsLabels = ( props ) => {
    return (
        <>
            <div className="attachment_label_container">
                <div className="label_field">Add attachment's here</div>
                <div className="button_field">
                    <Button variant="contained" component="label">
                        Select files
                        <input type="file" onChange={ props.onFileSelector } style={{ display:"none" }}  />
                    </Button>
                </div>
            </div>
        </>
    )
}