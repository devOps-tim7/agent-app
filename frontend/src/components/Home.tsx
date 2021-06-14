import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Container,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Product, useProducts } from '../hooks/useProducts';

const Home = () => {
  const { data } = useProducts();
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (id: number) => {
    if (localStorage.getItem('token')) {
      history.push(`/products/${id}`);
    } else {
      history.push(`/purchase/${id}`);
    }
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={4}>
        {data.map((product: Product) => (
          <Grid item key={product.id} xs={12} md={4}>
            <Card onClick={() => handleClick(product.id)}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`/api/product/${product.id}/image`}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {product.description}
                  </Typography>
                  <Typography variant='body1' component='div' className={classes.bottomText}>
                    <span>Price: {product.price}$</span>
                    <span className={classes.grower}></span>
                    {product.inStock ? (
                      <span>In stock: {product.inStock}</span>
                    ) : (
                      <span className={classes.soldOut}>SOLD OUT</span>
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles({
  media: {
    minHeight: 250,
  },
  bottomText: {
    marginTop: 16,
    display: 'flex',
  },
  grower: {
    flexGrow: 1,
  },
  soldOut: {
    color: '#ff1744',
    fontWeight: 'bold',
  },
});

export default Home;
