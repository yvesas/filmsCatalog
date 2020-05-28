import React, {Component}  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import api from '../../../services/api';

const styles =  theme => ({
  details: {
    fontSize: 18,
    color: theme.palette.grey[700],
  }
});
class ContentDetails extends Component {
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
      default:
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
        return film
      })
    }
    return movie
  }

  render() {
    const {item, mediaType} = this.state;
    const classes = this.props

    const renderByFormat = () => {
      switch(mediaType) {
        case 'person':
          let age = this.getAge(item.birthday)
          let lastMovie = this.getLastMovieCredits(item.MovieCredits)
          return(
            <div>
            <p className={classes.details}>
              Age: {age}
            </p>
            <p className={classes.details}>
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
              className={classes.rating}
              size={'small'}
              readOnly
            />
            <p className={classes.details}>
              Seasons: {item.number_of_seasons || '0'}
            </p>
            <p className={classes.details}>
              Release date: {item.first_air_date || item.release_date}
            </p>
          </div>)

        case 'movie':
          return(
            <div>
            <Rating
              name={'rating'}
              value={item.vote_average}
              defaultValue={0} max={10}
              className={classes.rating}
              size={'small'}
              readOnly
            />
            <p className={classes.details}>
              Rating: {item.vote_average}
            </p>
            <p className={classes.details}>
              Release date: {item.first_air_date || item.release_date}
            </p>
          </div>)

        default:
          return( 
              <p className={classes.details}>
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

export default withStyles(styles, { withTheme: true })(ContentDetails);