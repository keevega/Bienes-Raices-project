import express from 'express'
import { inicio, categorias, noEncontrado, buscador } from '../controllers/appController.js'
import identificarUsuario from "../middleware/identificarUsuario.js"

const router = express.Router()

// Pagina de inicio
router.get('/', identificarUsuario, inicio)

// Categorias
router.get('/categorias/:id', categorias)

// Pagina 404
router.get('/404', noEncontrado)

// Buscador
router.post('/buscador', buscador)

export default router;