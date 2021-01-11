import api from '../../services/api';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Box, TextField, Paper, Typography, Button, useTheme, useMediaQuery, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';

const New = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    file: ''
  })
  const [drop, setDrop] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleChange = (name, event) => {
    setForm({ ...form, [name]: name == 'file' ? event.target.files[0] : event.target.value })
  }

  useEffect(() => {
    (async function loadCategories() {
      const response = await api.get('/Jogo/Categorias')
      setCategories(response.data)
    })()
  }, [])

  const labelPhoto = useRef(null);
  const inputPhoto = useRef(null);

  const preview = useMemo(() => {
    return form.file ? URL.createObjectURL(form.file) : null;
  }, [form.file])

  useEffect(() => {
    (function dropzone() {
      const dropzone = labelPhoto.current;

      dropzone.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 1) {
          alert('Arraste somente 1 arquivo de imagem!')
          setDrop(false);
          return false;
        }
        inputPhoto.current.files = e.dataTransfer.files
        setForm({...form, file: e.dataTransfer.files[0]})
      }

      dropzone.ondragover = () => {
        setDrop(true);
        return false;
      }

      dropzone.ondragleave = () => {
        setDrop(false);
        return false; 
      }
    })()
  }, [drop])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('Imagem', form.file);
    data.append('Nome', form.name);
    data.append('Categoria', form.category)

    await api.post('/Jogo', data)

    history.push('/')
  }

  return (
    <Box css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Paper>
          <Box p={3} css={{ display: 'flex', flexDirection: 'column', width: matches ? '450px' : '350px' }}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>Cadastro de Jogo</Typography>
            <TextField id="standard-basic" label="Nome do Jogo" value={form.name} onChange={(event) => handleChange('name', event)} style={{ marginTop: '16px'}} />
            <FormControl style={{ marginTop: '16px' }}>
              <InputLabel id="categoria">Categoria</InputLabel>
              <Select
                labelId="categoria"
                value={form.category}
                onChange={(event) => handleChange('category', event)}
              >
                { categories.map((category) => (
                <MenuItem kley={category.valeu} value={category.name}>{category.name}</MenuItem>
              ))}
              </Select>
            </FormControl>
            <label 
            htmlFor="photo" 
            ref={labelPhoto}
            style={{
              backgroundImage: `url(${preview})`,
              border: form.file ? 0 : drop ? '1px dashed black' : '1px dashed #ddd',
              borderRadius: '4px',
              height: '200px',
              cursor: 'pointer',
              backgroundSize: 'cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
              marginTop: '16px',
            }}
            >
              {!form.file && (
                <>
                  <CameraAlt style={{ color: drop ? '#000' : '#ddd' }} /> 
                  <p style={{ color: drop ? '#000' : '#ddd' }}>Selecione ou arraste uma foto</p>
                </>
              )}
            </label>
            <input 
              type="file" 
              id="photo"
              style={{ display: 'none'}}
              onChange={event => handleChange('file', event)} 
              ref={inputPhoto} 
              accept="image/*"
            />
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  )
}

export default New;
