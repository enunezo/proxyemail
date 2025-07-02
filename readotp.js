const fs = require('fs');
const path = require('path');

const MAIL_DIR = path.join(__dirname, 'correos');
const otpRegex = /\b\d{4,6}\b/g;

function leerCorreosYExtraerOTP() {
  const archivos = fs.readdirSync(MAIL_DIR);

  archivos.forEach((archivo) => {
    const filepath = path.join(MAIL_DIR, archivo);
    const contenido = fs.readFileSync(filepath, 'utf8');

    const destinatarioMatch = contenido.match(/Para: (.+)/);
    const destinatario = destinatarioMatch ? destinatarioMatch[1] : 'desconocido';

    const otps = contenido.match(otpRegex);
    if (otps) {
      console.log(`📨 OTP(s) encontrados para ${destinatario}:`, otps.join(', '));
    } else {
      console.log(`⚠️ No se encontró OTP en: ${archivo}`);
    }
  });
}

leerCorreosYExtraerOTP();
