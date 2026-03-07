import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const { email, nombre, token } = datos;

    //Enviar Email
    await transport.sendMail({
        from: 'Bienes Raices.com',
        to: email,
        subject: 'Confima tu cuenta en BienesRaices.com',
        text: 'Confima tu cuenta en BienesRaices.com',
        html:`
            <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>

            <p>Tu cuenta ya esta lista, solo debes confirmala en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a>
            </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            `
    })

}   

export {
    emailRegistro
}