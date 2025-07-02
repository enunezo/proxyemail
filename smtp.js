const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

// Crear directorio de correos si no existe
const MAIL_DIR = path.join(__dirname, 'correos');
if (!fs.existsSync(MAIL_DIR)) {
  fs.mkdirSync(MAIL_DIR);
}

const server = new SMTPServer({
  authOptional: true, // No autenticación, para pruebas
  onData(stream, session, callback) {
    simpleParser(stream)
      .then(parsed => {
        const to = parsed.to.text.replace(/[<>]/g, '').replace(/[@.]/g, '_');
        const filename = `correo_${to}_${Date.now()}.txt`;
        const filepath = path.join(MAIL_DIR, filename);

        const content = `De: ${parsed.from.text}\nPara: ${parsed.to.text}\nAsunto: ${parsed.subject}\n\n${parsed.text}`;

        fs.writeFileSync(filepath, content);
        console.log(`Correo recibido y guardado como ${filename}`);
      })
      .catch(err => {
        console.error('Error al parsear:', err);
      })
      .finally(() => callback());
  },
  disabledCommands: ['STARTTLS'] // Sin TLS para pruebas
});

server.listen(2525, () => {
  console.log('Servidor SMTP escuchando en puerto 2525');
});
