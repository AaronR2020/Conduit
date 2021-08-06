import React,{PureComponent} from "react";
import { Link } from "react-router-dom";
import './FooterNotAuth.css'
class FooterNotAuth extends PureComponent {
    render() {
        if(this.props.isLoggedIn){
            return(<></>)
        }
        else{
            return ( 
                <div className='Footer_unAuth'>
                    <p><Link to='/Login'><span className='Green'>Login</span></Link> or <Link to='/SignUp'><span className='Green'>Sign up</span></Link> to add comments on this article.</p>
                </div> );
        }
    }
}
 
export default FooterNotAuth;