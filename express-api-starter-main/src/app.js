const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

var usuarios=[
  {id:1,nombre:"joel",apellido:"novo"},
  {id:2,nombre:"diego",apellido:"matinez"},
  {id:3,nombre:"angel",apellido:"panero"},
]

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});
app.get('/usuarios/usuario1',(req,res)=>{
  res.json(usuarios[0])
})
app.get('/usuarios',(req,res)=>{
  res.json(usuarios)
})
/*app.post("/api/usuarios",req,res =>{
  const user =req.body
  user.id=usuarios.length+1
  usuarios.push(user)
  res.json(user)
})*/
app.post("/api/usuarios", (req, res) => {
  const { nombre, apellido } = req.body;
  const user = { 
    id: usuarios.length + 1, 
    nombre, 
    apellido 
  };

  usuarios.push(user);
  res.status(201).json(user); 
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  const usuario = usuarios.find(user => user.id === parseInt(id)); 
  res.json(usuario); 
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
