const emailSender = require('./lib/email-sender');

async function main() {
    let email = {
        from: '"Test user" <foo@example.com>',
        to: 'bar@example.com',
        subject: 'Subject test',
        html: '<b>Hola mundo</b>'
    }

    let mailSent = {};

    try {
        mailSent = await emailSender.sendMail(email);
    } catch (err) {
        console.log(err);
    }

    console.log('Envio exitoso:', mailSent);
}

main();