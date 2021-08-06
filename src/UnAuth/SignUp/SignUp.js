import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                username:'AarinSRebs',
                email:'AarinSRebs@gmail.com',
                password:'AarinSRebs',
                errorusername:null,
                erroremail:null,
                errorpassword:null
        }
    }
    onchangeVal=(e)=>{
        let {value,type}=e.target;
        switch({type}.type){
            case 'text':
                    this.setState({
                        username:{value}.value
                    });break;
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
            const {username,email,password}=this.state; 
            this.setState({
                erroremail:null,
                errorpassword:null
            })
            fetch('https://mighty-oasis-08080.herokuapp.com/api/users',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    {
                        user:
                            {
                                username,
                                email,
                                password,
                            }
                        
                    }
                )
            }).then(res=>{

                if(!res.ok){

                    this.setState({
                        errorpassword:'User Already Exists'
                    })
                    throw new Error('User Already Exists')
                }
                else{
                    return res.json()
                }
            }).then(
                user=>{
                    //redirect to home and push user info along with it!
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
            <h2 className='SignHEading'>Sign Up</h2>
            <Link to='/Login' className='SignLink'><span className="Green">Have an account?</span></Link>
        </div>
        <form className='formSign' onSubmit={this.onSubmit}>
        <input type='text' placeholder='Username' value={this.state.username} className='UserName input' onChange={this.onchangeVal} />
        {
            this.state.errorusername==null?'':<p className='errorMessage'>{this.state.errorusername}</p>
        }
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
        </>  );
    }
}
 
export default withRouter(SignUp);