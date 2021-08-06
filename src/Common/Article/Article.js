import {Component} from 'react';
import {Link} from 'react-router-dom'
import './article.css'
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    fav=(e)=>{
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${e.slug}/favorite`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        }).then(res=>res.json())
        //adds as favourate
    }
    unFav=(e)=>{
        //probelm with the data send from the api> favoutate value always remains false
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${e.slug}/favorite`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Token ${this.props.user.token}`
            },
        })
        //adds as favourate
    }
    render() { 
        return ( 

            <div className='article_preview col' key={this.props.obj.slug}>
                {
                   this.props.delete==true?this.props.user.username===this.props.obj.author.username?<span onClick={()=>this.props.fetchDataAfterDelete(this.props.obj.slug)} className='deleteArticle'>X</span>:<span></span>:<span></span>
                }
                {
                    
                }
                    <div className='article_meta row'>
                        <div className='author_meta row'>
                            <img src={this.props.obj.author.image} className='AuthorPicture'/>
                            <div className='author_post_meta col'>
                                <h4 className='author'>
                                <Link to={{
                        pathname: `/user/${this.props.obj.author.username}`,
                        data:this.props.obj,
                        value:this.props.data,
                    }}>

                        {this.props.obj.author.username}

                    </Link>              
                                    </h4>
                                <p className='data'>{this.props.obj.updatedAt}</p>
                            </div>
                        </div>
                        <div className='primary_button' onClick={()=>this.fav(this.props.obj)}><i className="fas fa-heart"></i>{this.props.obj.favoritesCount}</div>{/*Add like button with number */}
                    </div>
                    <h2 className='Articles_title'>{this.props.obj.title}</h2>
                    {this.props.obj.description.length<30?<p className='Articles_p'>{this.props.obj.description}</p>:<p>{this.props.obj.description.slice(0,50)+ ('...')}</p>}
                    
                    <div className='flex row sb'>
                    <Link to={{
                        pathname: `/article/${this.props.obj.slug}`,
                        data:this.props.obj,
                    }} className='ReadMore'>Read More...</Link> 
                    <div>
                        {
                            this.props.obj.tagList.map(obj=>(
                                obj.length<1?'':<button className='tagsDisplay' value={obj} onClick={this.props.fetchTag}>{obj}</button>
                            ))
                        }
                    </div>
                    </div>

                </div>
                )
        
    }
}
 
export default Article;