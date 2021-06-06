import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Thankyou = () => (
  <Container maxWidth='md' style={{ textAlign: 'center' }}>
    <Typography variant='h4'>Thank you for your purchase!</Typography>
    <Typography variant='h6'>
      <Link to='/'>Continue shopping</Link>
    </Typography>
  </Container>
);

export default Thankyou;
