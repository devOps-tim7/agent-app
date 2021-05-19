import { Container, Grid } from '@material-ui/core';
import BestSelling from './BestSelling';
import MostValuable from './MostValuable';

const Report = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BestSelling />
        </Grid>
        <Grid item xs={6}>
          <MostValuable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Report;
