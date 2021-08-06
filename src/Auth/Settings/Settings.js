import React from 'react';
import {withRouter} from 'react-router'
import './Settings.css'


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {image:this.props.user.image,username:this.props.user.username,bio:this.props.user.bio,email:this.props.user.email }
    }

    onClick=(e)=>{
        e.preventDefault()
        let {image,username,bio,email}=this.state
        fetch('https://mighty-oasis-08080.herokuapp.com/api/user',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                authorization:`Token ${this.props.user.token}`
            },
            body:JSON.stringify({
                user:{image,username,bio,email}
            })
        }).then(res=>res.json()).then(data=>{this.props.history.push('/');})
    }
    handleChange=(event)=>{
        let {name,value}=event.target;
        this.setState({[name]:value})
    }

    render() { 
        return ( 
            <>
            <div className='BoxNewArticle'>
                <h2 className='Center'>Your Setting</h2>
                <form className='form_NewArticle'>
                    <input type='text' name='image' placeholder='URL of profile picture' className='NewArticle_padding' onChange={this.handleChange} required/>
                    <input type='text'  value={`${this.props.user.username}`} name='username' placeholder={`${this.props.user.username}`} className='NewArticle_padding' onChange={this.handleChange} required/>
                    <textarea rows="15" name='bio' className='TextArea_NewArticle' className='NewArticle_padding' placeholder='Short bio about you' onChange={this.handleChange}></textarea>
                    <input type='text' value={`${this.props.user.email}`} name='email' placeholder={`${this.props.user.email}`} className='NewArticle_padding' onChange={this.handleChange} required/>
                    <input type='submit' value='Submit' className='Submit' onClick={this.onClick}/>
                </form>
            </div>
            </>
        )
    }
}
 
export default withRouter(Settings);