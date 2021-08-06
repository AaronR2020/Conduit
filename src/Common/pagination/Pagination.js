import {Component} from "react";
import './pagination.css'

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let articleCount=this.props.articleCount;
        let articlePerPage=this.props.articlePerPage;
        let buttonCount=Math.ceil(this.props.articleCount/this.props.articlePerPage)
        let arr=[];
        for(var i=1;i<=buttonCount;i++){
            arr.push(i)
        }
        return ( 
        
        <>
            <div className='pagination_outline'>
                <button className='pagination_Prev' onClick={this.props.prevPage}>Prev</button>
            {
            arr.map(number=>(
                <button className='pagination_button' key={number} value={number} onClick={this.props.PageVal}>{number}</button>
            ))
        }
                <button className='pagination_Prev' onClick={this.props.nextPage}>Next</button>

            </div>        
        </> );
    }
}
 
export default Pagination;