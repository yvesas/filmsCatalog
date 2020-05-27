import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logo.svg';

const Header = () => (
  <AppBar position="relative" style={{ background: '#032541' }} >
    <Toolbar>
      <img src={logo} alt="Logo" />
    </Toolbar>
  </AppBar> 
);

export default Header;