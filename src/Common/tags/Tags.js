import React,{Component} from "react";
import './Tags.css'

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = { tags:null, }
    }
    //method
    componentDidMount(){  
        if(this.props.tags)  {
            let tags=this.props.tags.tags
            let tagval=tags.map(obj=>{return obj.toLowerCase()}).
            filter(obj=>{if(obj.length>1){return true}})
            let tagsV= [...new Set(tagval)]
            this.setState({
                tags:tagsV
            })  
        } 

     
    }

    render(){
             if(!this.state.tags){return <h1>Loading..tags</h1>}
            else{    
                return(
                    <div className='Tag_box'>
                    {
                        this.state.tags.map(obj=><div className='IndivTags' key={obj} ><button value={obj} onClick={this.props.fetchTag}>{obj}</button></div>) 
                    }
                </div>
                )
            }
        } 
/*      return <h3>done</h3>
       
    } */
}

 
export default Tags;