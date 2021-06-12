import { Grid, Container, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';

const Purchase = () => {
  const { id } = useParams<{ id: string }>();
  const { single: product } = useProducts(id);
  const history = useHistory();

  const [purchase, setPurchase] = useState({
    name: '',
    address: '',
    phone: '',
    quantity: 0,
  });

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8081/api/purchase', {
      name: purchase.name,
      address: purchase.address,
      phone: purchase.phone,
      items: [
        {
          id,
          quantity: purchase.quantity,
        },
      ],
    });
    history.push('/thankyou');
  };

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h4' style={{ borderBottom: '2px solid black' }}>
            {`Purchase product: ${product.name}`}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant='h6'
              style={{
                borderBottom: '1px solid black',
                marginTop: 16,
                textAlign: 'left',
              }}>
              Purchase data:
            </Typography>
            <TextField
              margin='normal'
              label='Quantity'
              fullWidth
              value={purchase.quantity}
              type='number'
              onChange={handleChange('quantity')}
              inputProps={{
                min: 1,
                max: product.inStock,
              }}
              required
            />
            <Typography variant='h6' style={{ textAlign: 'left' }}>{`Total: ${
              product.price * purchase.quantity
            }$`}</Typography>
            <Typography
              variant='h6'
              style={{
                borderBottom: '1px solid black',
                marginTop: 16,
                textAlign: 'left',
              }}>
              Buyer data:
            </Typography>
            <TextField
              margin='normal'
              label='Name and surname'
              fullWidth
              value={purchase.name}
              onChange={handleChange('name')}
              required
            />
            <TextField
              margin='normal'
              label='Address'
              fullWidth
              value={purchase.address}
              onChange={handleChange('address')}
              required
            />
            <TextField
              margin='normal'
              label='Phone number'
              fullWidth
              value={purchase.phone}
              onChange={handleChange('phone')}
              required
            />
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flexGrow: 1 }} />
              <Button type='submit' color='primary' variant='contained'>
                Purchase
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Purchase;
