import React, { Component } from 'react';
import Popup from "reactjs-popup";

import Authserver from '../../authserver'
import Address from './address'
import Changepassword from './changepassword'


class Profile extends Component {
    constructor(){
        super()
        this.state= {
            username:''
        }
        this.Auth = new Authserver()
        this.handleLogout.bind(this)

    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/User')
        }else{
            var username = this.Auth.getUserName()
            this.setState({username:username})
        }
    }

    handleLogout(e){
        e.preventDefault();
        this.Auth.logout();
        this.props.history.replace('/')
    }

    render() {
        return (
            <div>
               <h2 style={{fontFamily:"Lucida Handwriting", marginTop:"6%", marginBottom:'2%', fontSize:40, textAlign:'center'}}> Hello {this.state.username} </h2>
               <Address username={this.state.username}/> 
                <Popup trigger={<button style={{backgroundColor:"#F2F259",margin:30,borderRadius:"25px"}}> Change My Password</button>} modal contentStyle={{width:'350px'}}>
                    <div>
                        <Changepassword username={this.state.username} />
                    </div>
                </Popup>              
                <p className="App-intro">
            <button type="button" className='btn btn-info' onClick={this.handleLogout.bind(this)} style={{margin:30}}>Logout</button>
                 </p>
            </div>
        );
    }
}

export default Profile;