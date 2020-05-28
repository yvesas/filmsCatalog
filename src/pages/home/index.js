import React, {Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import OCard  from '../../components/OCard';

import api from '../../services/api';

export default class Main extends Component {
  state ={
    items: [],
    resultInfo: {},
    page: 1,
    query: '',
    showOverview: true
  }
  apiKey = "e83f89ff8e1495b5203d7218d3095d9b"

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async (query, page = 1) => {
    let response = null;
    if(!query){
      response = await api.get(`/trending/all/day?api_key=${this.apiKey}&language=pt-BR`);
    }else{
      response = await api.get(`/search/multi?api_key=${this.apiKey}&page=${page}&language=pt-BR&query=${query}`);
    }
    
    const {results, ...resultInfo} = response.data;
    this.setState({items: results, resultInfo, page})
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

  handleChangeInputSearch = (e) => {
    this.setState({ query: e.target.value });
  }
  
  keyPressInputSearch = (e) => {
    if(e.keyCode === 13){
      this.setState({ query: e.target.value })
      this.loadItems(this.state.query)
    }
  }

  render(){
    const {items, page, resultInfo} = this.state;
    const styles =  makeStyles(({ spacing, palette }) => ({
      intro: {
        backgroundColor: palette.background.paper,
        padding: spacing(8, 0, 6),
      },
      actions: {
        marginTop: spacing(4),
      },
      cardGrid: {
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
      }
    }));
    
    return (
      <div>
        {/* head page */}
        <div className={styles.intro}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom>
              Welcome, feel free to search
            </Typography>
            <div className={styles.actions}>            
              <TextField label="look for..."  fullWidth={true} value={this.state.query} onKeyDown={this.keyPressInputSearch} onChange={this.handleChangeInputSearch} /> 
            </div>
          </Container>
        </div>

        {/* body page */}
        <Container className={styles.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <OCard item={item}></OCard>
            </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    ) 
  }

}