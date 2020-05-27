import React, {Component}  from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  state ={
    items: [],
    resultInfo: {},
    page: 1,
    query: '',
    flipping: false,
    flippingKey: 0
  }

  apiKey = "e83f89ff8e1495b5203d7218d3095d9b"

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async (query, page = 1) => {
    let response = null;
    if(!query){
      response = await api.get(`/trending/all/day?api_key=${this.apiKey}`);
    }else{
      response = await api.get(`/search/multi?api_key=${this.apiKey}&page=${page}&language=pt-BR&query=${query}`);
    }
    
    const {results, ...resultInfo} = response.data;
    this.setState({items: results, resultInfo, page})
    
    console.log(this.state)
  }

  prevPage = () => {
    const {page} = this.state;
    if(page === 1) return;

    const pageNumber = page - 1;
    this.loadItems(this.state.query, pageNumber)
  }

  nextPage = () => {
    const {page, resultInfo} = this.state;
    if(page === resultInfo.pages) return;

    const pageNumber = page + 1;
    this.loadItems(this.state.query, pageNumber)
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }
  
  keyPress = (e) => {
    if(e.keyCode == 13){
      this.setState({ query: e.target.value })
      this.loadItems(this.state.query)
    }
  }

  flippingThrough = (key) => {
    this.setState({ flipping: !this.state.flipping, flippingKey: key})

    console.log(key)
    console.log(this.state)
  }

  render(){
    const {items, page, resultInfo} = this.state;
    return (
      <div className="item-list">

        <input className="input-search" type="text" placeholder="Search" value={this.state.query} onKeyDown={this.keyPress} onChange={this.handleChange} />
      
        <div > 
          {items.map(item => (
            <div className="item-card" key={item.id}>
              <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${item.backdrop_path}`} onClick={this.flippingThrough}></img>
              </div>  
              <div className="infos flip-box">              
                <div className={this.state.flipping ? 'flip-box-inner flipping' : 'flip-box-inner'}>
                  <div className="flip-box-front"> 
                    <strong>{item.title || item.name}</strong>
                    <p>{item.overview}</p>
                  </div>
                  <div className="flip-box-back">
                      <strong>{item.title || item.name}</strong>
                      <p>Data de lançamento: {item.release_date || item.first_air_date}</p>
                      <p>Avaliação: {item.vote_average}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          { resultInfo.total_pages ?   
            <div className="actions">
                <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                <button disabled={resultInfo.pages===page} onClick={this.nextPage}>Próximo</button>
            </div> : null
          }


        </div>
      </div>
    ) 
  }
}