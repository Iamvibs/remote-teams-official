import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_all_contacts, delete_contacts } from '../../../store/actions/contactAction';
import CreateContacts from './CreateContacts';
import DisplayContacts from './DisplayContacts';
import UpdateContacts from './UpdateContacts';

export class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            pageSize:10,
            start:0,
            end:10,
            tokens:[],
            pageNo:1,
            editValue:{}
        }
    }
    /****************************
     * @DESC - LIFE CYCLE METHODS
     ****************************/
    componentDidMount(){
        this.props.get_all_contacts();
    }
    onClickNext = e => {
        let token = this.state.tokens;
        let tokenNextPage = this.props.connectappContact.all_contacts.nextPageToken;
        token.push(tokenNextPage);
        this.setState({
            start:(this.state.start+this.state.pageSize),
            end : (this.state.end + this.state.end ),
            pageNo:(this.state.pageNo +1  ),
            tokens:token
        })
        this.props.get_all_contacts(`pageToken=${tokenNextPage}`);
    }
    onClickPrevious = e => {
        let index = ( this.state.pageNo - 1 );
        console.log( this.state.tokens, index );
        let tokenNextPage = this.state.tokens[ index ];
        if( tokenNextPage === undefined ){
            this.props.get_all_contacts();
        } else {
            this.props.get_all_contacts(`pageToken=${tokenNextPage}`);   
        }
    }
    onEdit = ( value ) => e => {
        this.setState({
            editValue:value
        })
    }
    onRemoveEditKey = () => {
        this.setState({
            editValue:{}
        })
    }
    onDelete = value => e => {
        if( window.confirm("Are you sure to delete this contact?") ){

            this.props.delete_contacts(`resourceName=${value.resourceName}`);
        }
    }
    localProps = {
        onClickNext:this.onClickNext,
        onClickPrevious:this.onClickPrevious,
        onEdit:this.onEdit,
        onDelete:this.onDelete,
        onRemoveEditKey:this.onRemoveEditKey
    }
    render() {
        return (
            <div className="google_contacts_dashboard">
                <div className="contact_container_top">
                    <div className="contact_container_top__left">
                        <CreateContacts/>
                        { this.state.editValue.resourceName ? <UpdateContacts { ...this.props } { ...this.state } { ...this.localProps } /> : null }
                    </div>
                    <div className="contact_container_top__right">

                        <PageController { ...this.props } { ...this.state } { ...this.localProps }/>
                    </div>
                </div>
                <div className="contact_dashboard_bottom">
                    <DisplayContacts { ...this.props } { ...this.localProps }/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    connectappAuth : state.connectapp.auth,
    connectappContact : state.connectapp.contact
});

export default connect( mapStateToProps, {
    get_all_contacts,
    delete_contacts
})( withRouter( Dashboard ) );


export const PageController = ( props ) => {
    return (
        <div className="page_controller_main_containers">
            <div className="count_section">
                Showing { props.start } - { props.end } of { props.connectappContact.all_contacts.totalItems }
            </div>
            <div className="controller_section">
                <div className="controller" onClick={ props.onClickPrevious }><i className="fa fa-caret-left fa-2x" aria-hidden="true"></i></div>
                <div className="controller" onClick={ props.onClickNext }><i className="fa fa-caret-right fa-2x" aria-hidden="true"></i></div>
            </div>
        </div>
    )
}