import React, {Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import ContentDetails from './ContentDetails';

export default class OCard extends Component {
  state ={
    showOverview: true,
  }

  clickOnCard = () => {
    this.setState({ showOverview: !this.state.showOverview })
  }

  render() {
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
      overview: {
        fontSize: 14,
        color: palette.grey[500],
      },
    }));

    const {item} = this.props;
    return (
      <Card className={styles.card} direction="row">
        <CardActionArea onClick={this.clickOnCard} >

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
              <ContentDetails item={item}></ContentDetails>
            }

          </CardContent>

        </CardActionArea>
      </Card>      
    )
  }
}