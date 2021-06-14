import { Switch, Route, Link } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import { AppBar, Toolbar, Typography, Button, CssBaseline } from '@material-ui/core';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Purchase from './components/purchase/Purchase';
import Thankyou from './components/purchase/Thankyou';

const App = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
  }, []);

  return (
    <div>
      <CssBaseline />
      <AppBar position='static' style={{ marginBottom: 32 }}>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            <Link style={{ color: 'white', textDecoration: 'none' }} to='/'>
              Web shop
            </Link>
            {token && (
              <Link
                style={{ color: 'white', textDecoration: 'none', marginLeft: 16 }}
                to='/products'>
                Products
              </Link>
            )}
          </Typography>
          <Button color='inherit' component={Link} to='/login'>
            {token ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login setToken={setToken} />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route path='/products/:id'>
          <ProductDetails />
        </Route>
        <Route path='/purchase/:id'>
          <Purchase />
        </Route>
        <Route path='/thankyou'>
          <Thankyou />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
