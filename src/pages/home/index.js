import React, {Component}  from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

export default class Main extends Component {
  state ={
    items: [],
    resultInfo: {},
    page: 1,
    query: '',
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

  

  render(){
    const classes = makeStyles((theme) => ({
      intro: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      actions: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
    }));


    return (
      <div>
        <div className={classes.intro}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom>
              Welcome, make one search!
            </Typography>
            <div className={classes.actions}>            
              <TextField label="look for..."  fullWidth="true" value={this.state.query} onKeyDown={this.keyPress} onChange={this.handleChange} /> 
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">

        </Container>
      </div>
    ) 
  }

}