// Script para crear la tabla 'usuarios' si no existe
const db = require('./db');

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dni TEXT NOT NULL,
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  fechaNacimiento TEXT NOT NULL,
  genero TEXT NOT NULL,
  ciudad TEXT NOT NULL
)`);

console.log('Tabla usuarios verificada/creada.');
db.close();
