import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';

const Home = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function loadCategories() {
      const response = await api.get('/Jogo/Categorias')
      setCategories(response.data)
    })()
  }, [])

  return (
    <Box>
      { categories.map(category => (
        <Box key={category.value}>
          <Typography variant="h4">{category.name}</Typography>
          <Paper>
            
          </Paper>
        </Box>
      ))}
    </Box>
  )
}

export default Home;
