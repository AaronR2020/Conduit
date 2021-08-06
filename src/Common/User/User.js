import React from 'react'
import './User.css'
import Article from '../Article/Article'
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:null,id:null,articles:null}
    }
    componentDidMount(){
            fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.id.match.params.id}`).then(res=>res.json()).then(data=>{
                this.setState({
                    data:data.profile
                })
            })


            fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?author=${this.props.id.match.params.id}`).
            then(res=>res.json()).then(data=>{
                this.setState({
                    articles:data.articles
                })
            })


    }
    unfollow=()=>{
        console.log("unfollow");
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.id.match.params.id}/follow`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        }).then(res=>res.json()).then(data=>{
            this.setState({data:data.profile})
        })
    }
    follow=()=>{
        console.log('follow');
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.id.match.params.id}/follow`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        }).then(res=>res.json()).then(data=>{
            this.setState({data:data.profile})
        })

    }
    render() { 
        if(!this.state.data){
            return <h1>Loading..</h1>
        }
        else{
            return(
                <>
                    <div className='ProfilePage_banner'>
                       <img src={this.state.data.image}className='ProfilePage_img'/>
                        <h2>{this.state.data.username}</h2>
                        <div className='full_Scale'>
                                <div className='border_box'>
                                    {  
                                        this.props.isLoggedIn?this.state.data.following?<span className='Unfollow' onClick={this.unfollow}>Unfollow {this.state.data.username}</span>:<span className='follow' onClick={this.follow}>Follow {this.state.data.username}</span>:''
                                    }
                                </div>
                        </div>
                    </div>
                    <div className='ProfilePage_outline'>
                        <div className='ProfilePage_Buttons'>
                        </div>
                        <div className='ArticleListProfile_User'>
                                  {
                                      this.state.articles?this.state.articles.map(article=><Article obj={article}/>):''
                                  }  
                        </div>
                       
                    </div>     
                </>
            )
        }
    }
}
 
export default User;