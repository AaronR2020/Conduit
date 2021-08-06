import {Component} from 'react'
import './Comment.css'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {comments:null,body:''  }
    }
    componentDidMount(){
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.articleInfoUser.slug}/comments`).
        then(res=>res.json()).then(data=>this.setState({comments:data.comments}))
    }
   onSubmit=(e)=>{
        e.preventDefault()
       let {body}=this.state;
       fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.articleInfoUser.slug}/comments`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
             authorization:`Token ${this.props.user.token}`
        },
        body:JSON.stringify({
            comment:{body}
        })
    }).then(res=>res.json()).then(data=>{
        this.componentDidMount()
    })   
   }

   deleteComment=(obj)=>{
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.articleInfoUser.slug}/comments/${obj.id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
             authorization:`Token ${this.props.user.token}`
        },
    }).then(data=>{
        this.componentDidMount()
    })
   }
    onchangeVal=(e)=>{
        this.setState({
            body:e.target.value
        })
    }

    render() { 
        if(!this.props.isLoggedIn){
            if(this.state.comments){
                return (
                    <>
                    {
                        this.state.comments.map(comment=>(
                        <div className='comment_block'>
                    <div className='author_meta  row'>
                                            <img src={comment.author.image} className='AuthorPicture'/>
                                            <div className='author_post_meta col'>
                                                <h3 className='author'>{comment.author.username}</h3>
                                            </div>
                                        </div>
                                        <p>{comment.body}</p>
                    </div>
                                    ))
                    }
                    </>
                    )
            }
            else{
                return <h1>loading</h1>
            }
            //return only comments



        }
        else{
            if(this.state.comments){
                return (
                    <>
                    <form className='Comment_form' onSubmit={this.onSubmit}>
                        <textarea value={this.state.body} placeholder='Input Comment' rows='3' cols='80' onChange={this.onchangeVal}>
                        </textarea>
                        <input type='submit' value='submit' className='Submit'/>
                    </form >
                                        {
                            this.state.comments.map(comment=>(
                            <div className='comment_block'>
                                            {this.props.user.username===comment.author.username?<span className='deleteComment' onClick={()=>this.deleteComment(comment)}>X</span>:''}                     
                        <div className='author_meta  row'>
                                                <img src={comment.author.image} className='AuthorPicture'/>
                                                <div className='author_post_meta col'>
                                                    <h3 className='author'>{comment.author.username}</h3>
                                                </div>
                                            </div>
                                            <p>{comment.body}</p>
                        </div>
                                        ))
                        }
                    
                    
                    </>
                )
            }
            else{
                return <h1>Loading</h1>
            }
            //post comment and display comment


        }
        
    }
}
 
export default Comment;