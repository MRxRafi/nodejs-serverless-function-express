import type { VercelRequest, VercelResponse } from '@vercel/node'

// Mapa de códigos a URLs destino
const urlMap: Record<string, string> = {
  '1': 'https://shorturl.at/P8oKi',
  '2': 'https://drive.google.com/imagen2',
  '3': 'https://tu_otro_destino.com',
};

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enviar notificación Slack
  const message = {
    text: `Test push desde Vercel`
  };
  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Respuesta webhook Slack:', response.status, await response.text());
  } catch (error) {
    console.error('Error enviando notificación a Slack:', error);
  }
  
  return res.json({
    message: req.query,
  })
}
/*
// Perplexity
const fetch = require('node-fetch'); // Vercel ya lo soporta, si no, instalar

module.exports = async (req, res) => {
  const code = req.query.code;

  if (!code || !urlMap[code]) {
    res.status(400).send('Código no válido');
    return;
  }

  // Redirigir a la URL correspondiente
  res.writeHead(302, { Location: urlMap[code] });
  res.end();
};*/
