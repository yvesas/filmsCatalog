import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => (
  <footer className={classes.footer}>
    <Typography variant="h6" align="center" gutterBottom>
      Thanks for your visit!
    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      Thanks TMDB for API and layout! :P
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.themoviedb.org/">
         TMDB API - original
      </Link>
      {' '}{new Date().getFullYear()}{'.'}
    </Typography>
  </footer>
);

export default Footer;