import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import React,{Component} from 'react';
import Nav from './Common/navigation/Nav.js'
import Home from './Common/Home/Home.js'
import Login from './UnAuth/Login/Login.js'
import SignUp from './UnAuth/SignUp/SignUp.js';
import userContext from '../src/Utils/ContextApi';

import CreatePost from './Auth/CreatePost/CreatePost.js';
import Profile from './Auth/Profile/Profile.js';
import Settings from './Auth/Settings/Settings.js';

import ArticlePage from '../src/Common/ArticlePage/ArticlePage'

import User from '../src/Common/User/User.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user:null,isLoggedIn:false }
  }

  //after loggin in or siggning up properly this is executed!
  loggedIn=(user)=>{
    this.setState({
      user:user,
      isLoggedIn:true
    });
  }
componentDidMount(){
    if(localStorage.getItem('token_value')){
      this.setState({
        isLoggedIn:true,
        user:JSON.parse(localStorage.getItem('user'))
      })      
    }
}
loggout=(e)=>{
  this.setState({
    user:null,
      isLoggedIn:false
  },()=>{window.localStorage.clear()})
  this.setState({})
}


  render() { 
    if(!this.state.isLoggedIn){
      return ( <>

        <BrowserRouter>
    
          <Nav isLoggedIn={false} user={this.state.user} />
    
          
             <Switch>
               <Route path='/' exact>
                  <userContext.Provider value={{user:this.state.user,isLoggedIn:this.state.isLoggedIn}} >
                        <Home  isLoggedIn={this.state.isLoggedIn} /> 
                  </userContext.Provider>
                </Route> 

                <Route path='/article/:slug'>
                  <userContext.Provider value={{user:this.state.user,isLoggedIn:this.state.isLoggedIn}} >
                        <ArticlePage  isLoggedIn={this.state.isLoggedIn} user={this.props.user}/> 
                  </userContext.Provider>
                </Route>
    
                <Route path='/SignUp' exact>
                    <SignUp/> 
                </Route> 
    
                <Route path='/Login' exact>
                    <Login loggedIn={this.loggedIn}/> 
                </Route> 

                <Route exact path="/user/:id" render={(props) => (
                <User id={props} isLoggedIn={this.state.isLoggedIn} />
          )} />
    
            </Switch>
    
        </BrowserRouter>
    
        </> );
    }

    //Authenticated Pages
    else{
      return(
        <>
                <BrowserRouter>
    
    <Nav isLoggedIn={this.state.isLoggedIn} user={this.state.user} logout={this.loggout}/>
       <Switch>
         <Route path='/' exact>
            <userContext.Provider value={{user:this.state.user,isLoggedIn:this.state.isLoggedIn}} >
                  <Home user={this.state.user} isLoggedIn={this.state.isLoggedIn}/> 
            </userContext.Provider>
          </Route> 

          <Route path='/CreatePost' exact>
              <CreatePost  isLoggedIn={this.state.isLoggedIn} user={this.state.user}/> 
          </Route> 

         
          <Route path='/Profile/:id'>
              <Profile  isLoggedIn={this.state.isLoggedIn} user={this.state.user}/> 
          </Route> 

          <Route exact path="/user/:id" render={(props) => (
                <User id={props} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
          )} />


          <Route path='/Settings' exact>
              <Settings isLoggedIn={this.state.isLoggedIn} user={this.state.user}/> 
          </Route> 

          <Route path='/article/:slug'>
                  <userContext.Provider value={{user:this.state.user,isLoggedIn:this.state.isLoggedIn}} >
                        <ArticlePage isLoggedIn={this.state.isLoggedIn} user={this.state.user}/> 
                  </userContext.Provider>
                </Route>
      </Switch>
  </BrowserRouter>
        </>
      )
    }
  }
}
 
export default App;
