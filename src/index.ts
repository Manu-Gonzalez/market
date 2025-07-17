import app from './app';
import express from 'express';

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`) ;
});

