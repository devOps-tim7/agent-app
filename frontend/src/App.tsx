import { Switch, Route, Link } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import { AppBar, Toolbar, Typography, Button, CssBaseline } from '@material-ui/core';
import Home from './components/Home';
const App = () => {
  return (
    <div>
      <CssBaseline />
      <AppBar position='static' style={{ marginBottom: 32 }}>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            <Link style={{ color: 'white', textDecoration: 'none' }} to='/'>
              Web shop
            </Link>
            {/* check if admin */}
            <Link style={{ color: 'white', textDecoration: 'none', marginLeft: 16 }} to='/products'>
              Products
            </Link>
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route path='/products/:id'>
          <ProductDetails />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
