import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home'

const App = () => (
    <div className="App">
        <CssBaseline />
        <Header/>
        <main>
            <Home/>
        </main>
        <Footer/>
    </div>
);

export default App;
