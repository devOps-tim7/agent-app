import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TextField, Button, Grid, Container, Typography } from '@material-ui/core';
import { isNew, useProducts } from '../../hooks/useProducts';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { single: product, setSingle: setProduct, create, edit } = useProducts(id);

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
    await create(formData);
    history.push('/products');
  };

  const handleEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await edit();
      alert('Edit successful');
    } catch (error) {}
  };

  const handleEditImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('peep');
  };

  const newProduct = isNew(id);

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h4' style={{ borderBottom: '2px solid black' }}>
            {newProduct ? 'Add new product' : 'Product details'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={newProduct ? handleCreate : handleEdit}>
            <TextField
              margin='normal'
              label='Name'
              fullWidth
              value={product.name}
              onChange={handleChange('name')}
            />
            <TextField
              margin='normal'
              label='Description'
              fullWidth
              multiline
              rows={10}
              value={product.description}
              onChange={handleChange('description')}
            />
            <TextField
              margin='normal'
              label='Price'
              fullWidth
              type='number'
              value={product.price}
              onChange={handleChange('price')}
            />
            <TextField
              margin='normal'
              label='In stock'
              fullWidth
              type='number'
              value={product.inStock}
              onChange={handleChange('inStock')}
            />
            {newProduct && (
              <TextField
                margin='normal'
                label='Image'
                fullWidth
                type='file'
                variant='standard'
                inputProps={{
                  accept: 'image/*',
                }}
                required={true}
                onChange={handleFileChange}
              />
            )}
            <div style={{ textAlign: 'right', width: '100%' }}>
              <Button type='submit' color='primary' variant='contained'>
                Submit
              </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          {!newProduct && (
            <form onSubmit={handleEditImage}>
              <img src={product.image} width={250} alt='Product' />
              <TextField
                margin='normal'
                label='Image'
                fullWidth
                type='file'
                variant='standard'
                inputProps={{
                  accept: 'image/*',
                }}
                onChange={handleFileChange}
              />
              <div style={{ textAlign: 'right', width: '100%' }}>
                <Button type='submit' color='primary' variant='contained'>
                  Change
                </Button>
              </div>
            </form>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
