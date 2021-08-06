
import React from 'react';
import {withRouter} from 'react-router-dom';
import './profile.css';
import Articles from '../../Common/Article/Article';



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeClass:'author',data:null,isloggedIn:null,user:null,id:null }
    }
    fetchDataAfterDelete=(e)=>{
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${e}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        }).then(res=>res.json()).then(data=>{
            fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?${this.state.activeClass}=${this.state.id}`).
            then(res=>res.json()).then(data=>{
                this.setState({
                    data:data.articles
                })
            })
        })
        this.componentDidMount()
        this.setState({})
        //delete Article
        
    }
    fetchData=(event)=>{
        let {name,value}=event.target;
        this.setState({[name]:value},()=>{
            fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?${this.state.activeClass}=${this.props.match.params.id}`).
        then(res=>res.json()).then(data=>{
            this.setState({
                data:data.articles
            })
        })
        })
    }

    componentDidMount(){
        this.setState({
                isloggedIn:this.props.isloggedIn,
                user:this.props.user,
                id:this.props.match.params.id
        },()=>{
            fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?${this.state.activeClass}=${this.state.id}`).
            then(res=>res.json()).then(data=>{
                this.setState({
                    data:data.articles
                })
            })
        })
    }

    unFavUser=(e)=>{
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${e}/favorite`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        }).then(res=>res.json())
    }
    render() { 
        if(this.state.data==null){
           return <h1>Loading.......</h1>
        }
        else{
            return ( 
                <>  
                <div className='ProfilePage_banner'>
                       <img src={this.state.user.image} className='ProfilePage_img'/>
                        <h2>{this.state.id}</h2>
                        <div className='full_Scale'>
                                <div className='border_box'>
                                </div>
                        </div>
                    </div>
                    <div className='ProfilePage_outline'>
                        <div className='ProfilePage_Buttons'>
                        <button name='activeClass' value='author' onClick={this.fetchData} className={this.state.activeClass=='author'?"active_profilepage":"none"}>My Article</button>
                        <button  name='activeClass' value='favorited' onClick={this.fetchData} className={this.state.activeClass=='favorited'?"active_profilepage":"none"}>favorited Article</button>
                        </div>
                        <div className='ArticleListProfile'>
                        {
                            this.state.data.map(obj=><Articles obj={obj} user={this.props.user} delete={true} fetchDataAfterDelete={this.fetchDataAfterDelete} unfav={this.unFavUser}/>)
                        }
                        </div>
                       
                    </div>        
                </> );
        }

            
        
    }
}
 
export default withRouter(Profile);