import { Button, Container, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface LoginProps {
  setToken: (arg0: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setToken('');
    localStorage.removeItem('token');
  }, [setToken]);

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', user);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      history.push('/products');
    } catch (error) {
      setError(error.response.data.errors[0].base);
    }
  };

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: 16 }}>
          <Typography variant='h5'>Login</Typography>
          <TextField
            margin='dense'
            label='Username'
            fullWidth
            value={user.username}
            onChange={handleChange('username')}
          />
          <TextField
            margin='dense'
            label='Password'
            fullWidth
            type='password'
            value={user.password}
            onChange={handleChange('password')}
          />
          <Button variant='contained' color='primary' type='submit'>
            login
          </Button>
          <Typography variant='body1' style={{ color: 'red' }}>
            {error}
          </Typography>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
