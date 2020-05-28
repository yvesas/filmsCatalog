import React, {Component}  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import ContentDetails from './ContentDetails';
import ImageIcon from '@material-ui/icons/Image';

const styles =  theme => ({      
  card: {
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: 16,
  },
  media: {
    minWidth: '50%',
    maxWidth: '100%',
    flexShrink: 0,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
  },
  rating: {
    verticalAlign: 'text-top',
  },
  content: {
    padding: theme.spacing(0, 2, 0, 0),
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginBottom: 0,
    marginRight: theme.spacing(1.5),
    display: 'inline-block',
  },
  overview: {
    fontSize: 14,
    color: theme.palette.grey[700],
  },
});
 class OCard extends Component {
  state ={
    showOverview: true,
  }

  clickOnCard = () => {
    this.setState({ showOverview: !this.state.showOverview })
  }

  render() {
    const {item, classes} = this.props;

    const showMedia = () => {
      if(item.poster_path || item.profile_path){
        return (
          <CardMedia
            className={classes.media}
            component="img"
            image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path || item.profile_path}`}
            title={item.title || item.name}
            alt={item.title || item.name}
          />
        )
      }else{
        return (
          <ImageIcon color="action" />
        )
      }
    }

    return (
      <Card className={classes.card} direction="row">
        <CardActionArea onClick={this.clickOnCard} >
          {showMedia()}
          <CardContent className={classes.content}>
            <Box mb={1}>
              <h3 className={classes.heading}>{item.title || item.name}</h3>
            </Box>

            {this.state.showOverview ?
              <p className={classes.overview}>
                {item.overview}
              </p>
              :
              <ContentDetails item={item}></ContentDetails>
            }

          </CardContent>

        </CardActionArea>
      </Card>      
    )
  }
}

export default withStyles(styles, { withTheme: true })(OCard);