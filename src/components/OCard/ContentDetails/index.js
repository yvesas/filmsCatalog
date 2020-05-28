import React, {Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

export default class ContentDetails extends Component {
  state ={
    showOverview: this.props.showOverview,
    item: this.props.item,
    mediaType: "movie" || this.props.item.media_type,
  }


  render() {
    const styles =  makeStyles(({palette}) => ({
      overview: {
        fontSize: 14,
        color: palette.grey[500],
      },
    }));
    const {item} = this.state;

    const renderByFormat = () => {
      switch(item.media_type) {
        case 'person':
          return(
            <div>
            <p className={styles.overview}>
              {item.popularity}
            </p>
          </div>)
        case 'tv':
          return(
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
          </div>)
        default:
          return( 
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
            </div>)
      } 
    }

    return (
      <div>
      {renderByFormat()}
      </div>
    )
  }
}