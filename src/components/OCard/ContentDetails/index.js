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
    let newItem = null
    switch(this.state.item.media_type){
      case 'person':
        let results = await api.get(`/person/${this.state.item.id}?api_key=${this.apiKey}&language=en-US`);
        let credits = await api.get(`/person/${this.state.item.id}/movie_credits?api_key=${this.apiKey}&language=en-US`);
        newItem = results.data;
        newItem.MovieCredits = credits.data;
        this.setState({item: newItem})
        break;
      case 'tv':
        newItem = await api.get(`/tv/${this.state.item.id}?api_key=${this.apiKey}&language=en-US`);
        this.setState({item: newItem.data})        
        break;
    }
  }

  getAge = (birth) => {
    let today = new Date();
    let birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
  }
  getLastMovieCredits = (movieCredits) => {
    let movie = {title:'', release_date:'0'}
    if(movieCredits){
      movieCredits.cast.map((film)=>{
        let filmRelease = parseInt(film.release_date.replace("-",""))
        let movieRelease = parseInt(movie.release_date.replace("-",""))
        if(movieRelease < filmRelease){
          movie = film
        }
      })
    }
    return movie
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
          let age = this.getAge(item.birthday)
          let lastMovie = this.getLastMovieCredits(item.MovieCredits)
          return(
            <div>
            <p className={styles.overview}>
              Age: {age}
            </p>
            <p className={styles.overview}>
              Last movie: {lastMovie.title}
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