import { Switch, Route } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';

const App = () => {
  return (
    <Switch>
      <Route exact path='/products'>
        <Products />
      </Route>
      <Route path='/products/:id'>
        <ProductDetails />
      </Route>
    </Switch>
  );
};

export default App;
