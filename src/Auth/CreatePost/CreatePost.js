import React from 'react';
import './CreatePost.css';
import {withRouter} from 'react-router'



class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title:'',description:'',body:'',tagList:'',user:'' }
    }
    handleChange=(event)=>{
        let {name,value}=event.target;
        this.setState({[name]:value})
    }

    onClick=(e)=>{
        const {title,description,body,tagList}=this.state
        e.preventDefault()
        //send data
         fetch('https://mighty-oasis-08080.herokuapp.com/api/articles',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                authorization:`Token ${this.props.user.token}`
            },
            body:JSON.stringify({
                article:{title,description,body,tagList:tagList.split(',').map(obj=>obj.trim().toLowerCase())}
            })
        }).then(res=>res.json()).then(data=>{this.props.history.push('/')})

    }
    render() { 
        return ( 
            <>
            <h2 className='CreatePost_h1'>Write Article</h2>
            <div className='BoxNewArticle'>
                <form className='form_NewArticle'>
                    <input type='text' name='title' placeholder='Article Title' className='NewArticle_padding' onChange={this.handleChange}/>
                    <input type='text' name='description' placeholder='What this article is all about' className='NewArticle_padding' onChange={this.handleChange}/>
                    <textarea rows="15" name='body' className='TextArea_NewArticle' className='NewArticle_padding' placeholder='Write your article(In markdown format)' onChange={this.handleChange}></textarea>
                    <input type='text' name='tagList' placeholder='Enter tags seperated by ","' className='NewArticle_padding' onChange={this.handleChange}/>
                    <input type='submit' value='Submit' className='Submit' onClick={this.onClick}/>
                </form>
            </div>
            </>
         );
    }
}
 
export default withRouter(CreatePost);