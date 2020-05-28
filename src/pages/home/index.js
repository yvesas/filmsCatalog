import React, {Component}  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import OCard  from '../../components/OCard';

import api from '../../services/api';

const styles = theme => ({
  intro: {
    backgroundColor: '#ededed',
    padding: theme.spacing(4, 0, 2),
  },
  actions: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
  },
  body:{
    backgroundColor: '#ededed',
    paddingBottom: theme.spacing(2)
  }
});

 class Home extends Component {
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
      response = await api.get(`/trending/all/day?api_key=${this.apiKey}&page=${page}&language=en-US`);
    }else{
      response = await api.get(`/search/multi?api_key=${this.apiKey}&page=${page}&language=en-US&query=${query}`);
    }
    const {results, ...resultInfo} = response.data;
    this.setState({items: results, resultInfo, page})
    window.scrollTo(0, 0)
  }

  handleChangePage = async (event,value) => {
    const {page, resultInfo} = this.state;
    if(page === value) return;
    if(value > resultInfo.total_pages) return;
    this.loadItems(this.state.query, value)
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
    const { classes } = this.props;
    
    return (
      <div>
        {/* head page */}
        <div className={classes.intro}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom>
              Welcome The Movie Database, feel free to search
            </Typography>
            <div className={classes.actions}>            
              <TextField label="look for..."  fullWidth={true} value={this.state.query} onKeyDown={this.keyPressInputSearch} onChange={this.handleChangeInputSearch} /> 
            </div>
          </Container>
        </div>
        {/* body page */}
        <div className={classes.body}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <OCard item={item}></OCard>
            </Grid>
            ))}
          </Grid>
        </Container>
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination count={resultInfo.total_pages} page={page} onChange={this.handleChangePage} shape="rounded" size="large" />
        </Grid>
        </div>
      </div>
    ) 
  }

}

export default withStyles(styles, { withTheme: true })(Home);