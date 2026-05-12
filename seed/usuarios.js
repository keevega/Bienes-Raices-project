import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Kevin',
        email: 'correo@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        nombre: 'Karla',
        email: 'correo2@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },
]

export default usuarios