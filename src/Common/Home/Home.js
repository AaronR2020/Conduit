import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Article from '../Article/Article'
import Tags from '../tags/Tags.js'
import Pagination from '../pagination/Pagination.js'



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTag:null,defaultData:null,articlePerPage:10, value:null,tags:null,offset:0,limit:10,data:null,articlesCount:0,tags:null }//value is isloggedIn and user
    }
    fetchTag=()=>{
        fetch('https://mighty-oasis-08080.herokuapp.com/api/tags').then(res=>res.json())
        .then(data=>
            {
                this.setState({tag:data})
            }
            )
    }
    fetchData=()=>{
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?offset=${this.state.offset}&limit=${this.state.limit}`).
        then(res=>res.json()).
        then(data=>{this.setState({data:data.articles,defaultData:data.articles,articlesCount:data.articlesCount})}).
        catch(e=>console.log(e))
    }

    componentDidMount(){
        this.fetchData();
        this.fetchTag();
    }

    fetchTagSpecificData=(e)=>{
        console.log(e.target.value);
        let {value}=e.target;//fetch specific tag
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${{value}.value}`).then(res=>res.json()).then(data=>{
           this.setState({
                articlesCount:data.articlesCount,
               data:data.articles,//data is updated with new value
               selectedTag:{value}.value//specific tag
           })
           })
    }

        PageVal=(e)=>{
            let number=e.target.value
            this.setState({
                offset:(number-1)*10,
            },()=>{this.fetchData()})
         } 

         prevPage=()=>{
             let number=this.state.offset/10
             number= number<1?1:number-1;
             this.setState({
                offset:(number)*10,
            },()=>{this.fetchData()})
    
         }

         nextPage=()=>{
            let number=this.state.offset/10
            number=number>Math.ceil(this.state.articleCount/this.state.articlePerPage)?Math.ceil(this.state.articleCount/this.state.articlePerPage):number+1;
            this.setState({
               offset:(number)*10,
           },()=>{this.fetchData()})
    
        }
        
        reset=()=>{
            this.setState({
                data:this.state.defaultData,
                selectedTag:null
            })
            this.fetchData()

        }

    render() {       
            if(!this.state.data){
                return <h1>Loading</h1>
            }
            else{
                return (
                    <>
                        <HomeBanner/>
                        <hr/>
                        <div className='Home_Page_flex'>
                        <div className='Home_GLobalFeed'>
                            {this.state.selectedTag===null? <button className='Home_active_button'>Global Feed</button>:<div><button className='Home_inactive_button' onClick={this.reset}>Global Feed</button> <button className='Home_active_button'>{this.state.selectedTag}</button></div>
                               }
                               <div className='ArticleList'>
                               {
                                this.state.data.map(obj=>(<Article obj={obj} fetchTag={this.fetchTagSpecificData} user={this.props.user} fetchData={this.fetchData}/>))
                                }
                               </div>
                            
                        </div>
                        <div className='tags_border'>
                                <Tags tags={this.state.tag} fetchTag={this.fetchTagSpecificData}/>
                        </div>
                        </div>
                        <Pagination 
                        articleCount={this.state.articlesCount}
                        articlePerPage={this.state.articlePerPage}
                        PageVal={this.PageVal}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                      />
                    </>
                )
            }
            
        
    }
}

class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <>
            <div className='HomeBanner'>
                <h2 className='HomeBanner_h2'>Conduit</h2>
                <p className='HomeBanner_p'> eget volutpat. Vivamus suscipit tortor eget felis .</p>
            </div>
        </>
         );
    }
}
 
export default Home;