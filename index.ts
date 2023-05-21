import express from 'express';
import dotenv from 'dotenv';
import { choose, fetchFileContents } from './utils';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: [process.env.CORS_URL!, process.env.CORS_URL_LOCAL!]
}))

app.get('/', (_, res) => {
  res.send('Food Decision Making Machine Server - try the \'/choose\' different route');
});

app.get('/choose', async (_, res) => {
  try {
    let choices: string = await fetchFileContents(process.env.CHOICES_URL!);
    let choicesWoolies: string = await fetchFileContents(process.env.CHOICES_WOOLIES_URL!);
    // Join the standard choices with woolies as either should be available
    choices = choices.concat(choicesWoolies);
    const standardChoice: string = choose(choices);
    let wooliesChoice: string = choose(choicesWoolies);
    while (wooliesChoice == standardChoice) {
      wooliesChoice = choose(choicesWoolies);
    }
    res.send({ choices: { standard: standardChoice, woolies: wooliesChoice } });
  } catch (error) {
    res.send({ Error: error })
  }
});

app.listen(port, () => {
  console.log(`food-decision-making-machine: Server is running at http://localhost:${port}`);
});