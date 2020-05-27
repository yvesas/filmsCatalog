import React, {Component}  from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import cx from 'clsx';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ModeComment from '@material-ui/icons/ModeComment';
import Favorite from '@material-ui/icons/Favorite';

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
      response = await api.get(`/trending/all/day?api_key=${this.apiKey}&language=pt-BR`);
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
    if(e.keyCode === 13){
      this.setState({ query: e.target.value })
      this.loadItems(this.state.query)
    }
  }

  

  render(){
    const {items, page, resultInfo} = this.state;
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

    const styles =  makeStyles(({ spacing, palette }) => ({
      card: {
        display: 'flex',
        padding: spacing(2),
        borderRadius: 16,
      },
      media: {
        minWidth: '25%',
        maxWidth: '25%',
        flexShrink: 0,
        backgroundColor: palette.grey[200],
        borderRadius: 12,
        boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
      },
      rating: {
        verticalAlign: 'text-top',
      },
      content: {
        padding: spacing(0, 2, 0, 0),
      },
      heading: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginBottom: 0,
        marginRight: spacing(1.5),
        display: 'inline-block',
      },
      body: {
        fontSize: 14,
        color: palette.grey[500],
      },
      divider: {
        margin: spacing(1, 0),
      },
      textFooter: {
        fontSize: 14,
      },
      icon: {
        fontSize: '1.2rem',
        verticalAlign: 'bottom',
      },
    }));
    
    return (
      <div>
        <div className={classes.intro}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom>
              Welcome, feel free to search
            </Typography>
            <div className={classes.actions}>            
              <TextField label="look for..."  fullWidth="true" value={this.state.query} onKeyDown={this.keyPress} onChange={this.handleChange} /> 
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">

          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                {/* <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path}`}
                    title="poster"
                    alt="poster"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title || item.name}
                    </Typography>
                    <Typography>
                      {item.overview}
                    </Typography>
                  </CardContent>
                </Card> */}
              
              <Card className={styles.card}>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path}`}
                  title={item.title || item.name}
                  alt={item.title || item.name}
                />
                <CardContent className={styles.content}>
                  <Box mb={1}>
                    <h3 className={styles.heading}>{item.title || item.name}</h3>
                    <Rating
                      name={'rating'}
                      value={2}
                      className={styles.rating}
                      size={'small'}
                    />
                  </Box>
                  <p className={styles.body}>
                    {item.overview}
                  </p>
                </CardContent>
                
              </Card>


              </Grid>
            ))}
          </Grid>

        </Container>
      </div>
    ) 
  }

}