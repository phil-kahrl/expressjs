import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok1' });
});

const api = express.Router();

api.get('/hello', (req, res) => {
  res.status(200).send({ message: 'hello world' });
});

api.post('/forecast', async (req, res) => {
  let apiKey = process.env.OPEN_WEATHER_API_KEY;
  let lat = req.body.lat
  let lon = req.body.lon
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  let response = await fetch(url, {
    headers: {'Content-Type': 'application/json'}
  });
  let data = await response.json();
  console.log("DATA")
  console.log(data)
  res.status(200).send(data);
});

// Version the api
app.use('/api/v1', api);
