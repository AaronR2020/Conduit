import React from 'react';
import './ArticlePage.css'
import {withRouter} from 'react-router-dom'
import FooterNotAuth from '../footer/footer';

import Comment from '../Comment/Comment.js'

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data:null,isLoggedIn:null,user:null }
    }
    componentDidMount(){
        this.setState({
            data:this.props.location.data,
            isLoggedIn:this.props.isloggedIn,
            user:this.props.user
        })
    }
    render() { 
        if(!this.state.data){
            return <h1>Loading..!</h1>
        }
        else{
            //we also have access to this.props.user that holds userInfo of the person logged In
        return ( 
        <>
       <div className='Indiv_Article'>
            <h2 className='Hero_h1'>{this.props.location.data.title}</h2>{/*data is userInfo who wrote that article */}
            <div className='author_meta row'>
                                    <img src={this.props.location.data.author.image} className='AuthorPicture'/>
                                    <div className='author_post_meta col'>
                                        <h3 className='author white'>{this.props.location.data.author.username}</h3>
                                        <p className='data white'>{this.props.location.data.updatedAt}</p>
                                    </div>
                                </div>
            </div>
            <div className='ArticlePage_body'>
            <p>{this.state.data.body}</p>
            <hr/>
            {
            this.state.user?<Comment isLoggedIn={this.props.isLoggedIn} user={this.state.user} articleInfoUser={this.props.location.data} />:<Comment isLoggedIn={this.props.isLoggedIn} articleInfoUser={this.props.location.data} />
            
            }

        </div>
        <FooterNotAuth isLoggedIn={this.props.isLoggedIn}/>
        </> );
        }
        
    }
}
 
export default withRouter(ArticlePage);