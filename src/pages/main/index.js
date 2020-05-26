import React, {Component}  from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css';

export default class Main extends Component {
  state ={
    items: [],
    resultInfo: {},
    page: 1,
    query: ''
  }

  apiKey = "e83f89ff8e1495b5203d7218d3095d9b"

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async (page = 1) => {
    const response = await api.get(`/trending/all/day?api_key=${this.apiKey}`);
    const {results, ...resultInfo} = response.data;
    this.setState({items: results, resultInfo, page})
    
    console.log(this.state)
  }

  prevPage = () => {
    const {page} = this.state;
    if(page === 1) return;

    const pageNumber = page - 1;
    this.loadItems(pageNumber)
  }

  nextPage = () => {
    const {page, resultInfo} = this.state;
    if(page === resultInfo.pages) return;

    const pageNumber = page + 1;
    this.loadItems(pageNumber)
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }
  
  keyPress = (e) => {
    if(e.keyCode == 13){
       console.log('query: ', e.target.value);
       // put new search
    }
  }

  render(){
    const {items, page, resultInfo} = this.state;
    return (
      <div>
        <input type="text" placeholder="Search" value={this.state.query} onKeyDown={this.keyPress} onChange={this.handleChange} />
      
        <div className="item-list"> 
          {items.map(item => (
            <article key={item.id}>
              <strong>{item.title || item.name}</strong>
              <p>{item.overview}</p>
            </article>
          ))}
          <div className="actions">
              <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
              <button disabled={resultInfo.pages===page} onClick={this.nextPage}>Próximo</button>
          </div>
        </div>
      </div>
    ) 
  }
}