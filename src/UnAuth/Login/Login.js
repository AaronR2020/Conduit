import React,{Component} from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email:'AarinSRebs@gmail.com',password:'AarinSRebs',errorpassword:'',erroremail:'' }
    }

    onchangeVal=(e)=>{
        let {value,type}=e.target;
            switch({type}.type){
                case 'email':
                        this.setState({
                            email:{value}.value
                        });break;
                
                case 'password':
                         this.setState({
                         password:{value}.value
                        });break;
            }
        }


    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.email.includes(".com")){
            this.setState(
                {
                    erroremail:'Enter Valid Email'
                }
            )
        }
       else if(this.state.password.length<6){
            this.setState(
                {
                    errorpassword:'password should be greater than 6'
                }
            )
        }
        else{
            //pass validation
            const {email,password}=this.state;
            this.setState({
                erroremail:null,
                errorpassword:null
            });
            fetch('https://mighty-oasis-08080.herokuapp.com/api/users/login'.toString(),{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    {
                        user:
                            {
                                email,
                                password
                            }
                    }
                )
            }).then(res=>{
                if(!res.ok){
                    this.setState({
                        errorpassword:"Invalid Credentials"
                    })
                    throw new Error('User Already Exists')
                }
                else{
                    return res.json()
                }
            }).then(
                user=>{     
                    localStorage.setItem('token_value',user.user.token);
                    localStorage.setItem('user',JSON.stringify(user.user));
                    this.props.loggedIn(user);
                    this.props.history.push('/');
                }          
                )
        }
    }

    render() { 
        return ( 
        <>
            <div className='form_Outline'>
                <h2 className='SignHEading'>Login</h2>
                <Link to='/SignUp' className='Link'><span className="Green">Need an account?</span></Link>
            </div>

            <form className='formSign' onSubmit={this.onSubmit}>

            <input type='email' placeholder='Email' value={this.state.email} className='email input' onChange={this.onchangeVal} />
            {
                this.state.erroremail==null?'':<p className='errorMessage'>{this.state.erroremail}</p>
            }
            <input type='password' placeholder='Password' value={this.state.password} className='password input' onChange={this.onchangeVal} />
            {
                this.state.errorpassword==null?'':<p className='errorMessage'>{this.state.errorpassword}</p>
            }
            <input type='submit' value='SignIn' className='Submit'/>
            
            </form>


        </> );
    }
}
 
export default withRouter(Login);