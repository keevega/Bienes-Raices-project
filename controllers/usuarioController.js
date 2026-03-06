import { check,validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesión'
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta'
    });
}

const registrar = async(req,res) => {
    //Validacion 
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({min: 6}).withMessage('El password debe ser de al menos 6 caracteres').run(req);
    await check('repetir_password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Los passwords no son iguales')
        .run(req);

    let resultado = validationResult(req);

    //console.log(resultado);
    //Verificar que el resultado este vacio

    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
    }

    //Extraer los Datos
    const { nombre, email, password } = req.body

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where :{ email }})
    if (existeUsuario) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El Usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
    }

    //Almacenar un usuario
    await Usuario.create({
        nombre,
        email,
        password,
        token: 123
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password',{
        pagina: 'Recupera tu Acceso a Bienes Raices'
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}