import React, {Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import api from '../../../services/api';
export default class ContentDetails extends Component {
  state ={
    showOverview: this.props.showOverview,
    item: this.props.item,
    mediaType: this.props.item.media_type
  }

  apiKey = "e83f89ff8e1495b5203d7218d3095d9b"

  componentWillMount = async() => {
    let newItem = null;
    switch(this.state.item.media_type){
      case 'person':
        newItem =  await api.get(`/person/${this.state.item.id}?api_key=${this.apiKey}&language=en-US`);
        this.setState({item: newItem.data})
        break;
      case 'tv':
        newItem = await api.get(`/tv/${this.state.item.id}?api_key=${this.apiKey}&language=en-US`);
        this.setState({item: newItem.data})        
        break;
    }
  }

  render() {
    const styles =  makeStyles(({palette}) => ({
      overview: {
        fontSize: 14,
        color: palette.grey[500],
      },
    }));
    const {item, mediaType} = this.state;

    const renderByFormat = () => {
      switch(mediaType) {
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
              Release date: {item.first_air_date || item.release_date}
            </p>
            <p className={styles.overview}>
              Seasons: {item.number_of_seasons || '0'}
            </p>
          </div>)

        case 'movie':
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
              Rating: {item.vote_average}
            </p>
            <p className={styles.overview}>
              Release date: {item.first_air_date || item.release_date}
            </p>
          </div>)

        default:
          return( 
              <p className={styles.overview}>
                {item.overview}
              </p>)
      } 
    }

    return (
      <div>
      {renderByFormat()}
      </div>
    )
  }
}