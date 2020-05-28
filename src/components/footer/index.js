import React, {Component}  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  footer: {
    backgroundColor: '#ededed',
    padding: theme.spacing(2),
  }
});
class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Thanks for your visit!
      </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thanks TMDB for API and Denox team for inspiration! :P
      </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://www.themoviedb.org/">
            TMDB API - original
        </Link>
          {' '}{new Date().getFullYear()}{'.'}
        </Typography>
      </footer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Footer);
