import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import userContext from '../../Utils/ContextApi'



class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { activeLink:null, }
    }
    activeMethod=(e)=>{
        this.setState({
            activeLink:e.target.innerHTML
        })
    }

    render() { 
        if(!this.props.isLoggedIn){
            return (
                <>                
                <nav>
                    <div className='nav'>
                        <span className='Heading'>Conduit</span>
                        <ul className='nav_ul'>
                        <Link to={{pathname:'/'}} onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Home'?'activeClass nav_li':'nav_li'}>Home</li></Link>
                        <Link to={{pathname:'/SignUp'}}  onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Sign Up'?'activeClass nav_li':'nav_li'} >Sign Up</li></Link>
                        <Link to={{pathname:'/Login'}} onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Login'?'activeClass nav_li':'nav_li'} >Login</li></Link>
                    </ul>
                    </div>
                    
                </nav>
                </> );
        }
        else{
            return (
                <>               
                <nav>
                    <div className='nav'>
                        <span className='Heading'>Conduit</span>
                        <ul className='nav_ul'>
                        <Link to={{pathname:'/',props:{user:this.props.user}}} onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Home'?'activeClass nav_li':'nav_li'}>Home</li></Link>
                        <Link to={{pathname:'/CreatePost',props:{user:this.props.user}}}  onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Create Post'?'activeClass nav_li':'nav_li'} >Create Post</li></Link>
                        <Link to={{pathname:'/Settings',props:{user:this.props.user}}} onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink==='Settings'?'activeClass nav_li':'nav_li'} >Settings</li></Link>
                        <Link to={{pathname:`/Profile/${this.props.user.username}`,props:{user:this.props.user}}} onClick={this.activeMethod} className='Link'><li className='nav_li' className={this.state.activeLink===5?'activeClass nav_li':'nav_li'} >{this.props.user.username}</li></Link>
                        <Link to={{pathname:'/'}} className='Link' ><li className='nav_li'onClick={this.props.logout} className={this.state.activeLink==='Logout'?'activeClass nav_li':'nav_li'} >Logout</li></Link>
                        
                        {
                            //access these props> value.location.props.user
                        }
                    </ul>
                    </div>
                    
                </nav>
                </> );
        }
    
}
}
 
export default Nav;