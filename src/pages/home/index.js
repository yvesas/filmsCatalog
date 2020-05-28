import React, {Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grow from '@material-ui/core/Grow';

import ModalDetails from '../../components/modalDetails';

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

  handleChangeInputSearch = (e) => {
    this.setState({ query: e.target.value });
  }
  
  keyPressInputSearch = (e) => {
    if(e.keyCode === 13){
      this.setState({ query: e.target.value })
      this.loadItems(this.state.query)
    }
  }

  clickOnCard = (id) => {
    this.setState({ showOverview: !this.state.showOverview })
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
      },
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
      overview: {
        fontSize: 14,
        color: palette.grey[500],
      },
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
              <TextField label="look for..."  fullWidth="true" value={this.state.query} onKeyDown={this.keyPressInputSearch} onChange={this.handleChangeInputSearch} /> 
            </div>
          </Container>
        </div>

        {/* body page */}
        <Container className={styles.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {items.map((item) => (
             <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card className={styles.card} direction="row">
                <CardActionArea onClick={this.clickOnCard(item.id)} >
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
                  </Box>
                  {this.state.showOverview ?
                      <p className={styles.overview}>
                        {item.overview}
                      </p>
                  : 
                    <div>
                      <Rating
                        name={'rating'}
                        value={item.vote_average}
                        defaultValue={0} max={10}
                        className={styles.rating}
                        size={'small'}
                        readOnly
                      />
                      <p className={styles.overview}>
                        {item.first_air_date || item.release_date}
                      </p>
                    </div>
                  }
                  {/* <Grow in={this.state.showOverview}> */}
                    
                  {/* </Grow> */}
                  {/* <Grow in={!this.state.showOverview}> */}
                  
                  {/* </Grow> */}
                </CardContent>
                </CardActionArea>
              </Card>
              {/* <ModalDetails></ModalDetails> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    ) 
  }

}