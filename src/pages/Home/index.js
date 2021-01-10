import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Paper, Typography, Button, useMediaQuery, useTheme, TextField } from '@material-ui/core';

const Home = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    (async function loadCategories() {
      const response_categories = await api.get('/Jogo/Categorias')
      const response_games = await api.get('/Jogo/Listar')
      setCategories(response_categories.data)
      setGames(response_games.data.jogos)
    })()
  }, [])

  const deleteGame = async (id) => {
    await api.delete(`/Jogo/${id}`)

    const filteredGames = games.filter(games => games.id !== id);

    setGames(filteredGames)
  }

  return (
    <Box mb={5}>
      <Box justifyContent="center" display="flex" mb={5}>
        <TextField label="Pesquisar" style={{ width: '350px' }} value={filter} onChange={(e) => setFilter(e.target.value)} />
      </Box>
      { categories.map(category => (
        <Box key={category.value}>
          <Typography variant="h4" color="primary">{games.filter(game => game.categoria === category.name).filter(game => game.nome.includes(filter)).length ? category.name : ''}</Typography>
          <Box display="flex" alignItems="center" mt={2} mb={2} flexDirection={{ xs: 'column', md: 'row' }}>
            { games.length && games.filter(game => game.categoria === category.name).filter(game => game.nome.includes(filter)).map(game => (
              <Paper key={game.id} style={{ marginRight: matches ? '32px' : 0, width: '350px', height: '350px', }}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={2}>
                  <Typography variant="h5" color="primary">{game.nome}</Typography>
                  <img src={`http://localhost:5000/api/Jogo/ObterCapa/${game.id}`} style={{ width: '250px', height: '150px', marginTop: '16px', marginBottom: '16px' }}/>
                  <Button variant="contained" color="primary" style={{ width: '250px'}} onClick={() => history.push(`/edit/${game.id}`)}>Editar</Button>
                  <Button variant="contained" color="secondary" style={{ width: '250px', marginTop: '16px' }} onClick={() => deleteGame(game.id)}>Excluir</Button>
                </Box>
              </Paper>
            ))}
          </Box>
        
        </Box>
      ))}
    </Box>
  )
}

export default Home;
