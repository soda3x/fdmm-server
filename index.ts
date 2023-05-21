import express from 'express';
import dotenv from 'dotenv';
import { choose, fetchFileContents } from 'choose-for-me'
import cors from 'cors';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT!);

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
    const standardChoice: string = choose(choices, '\n');
    let wooliesChoice: string = choose(choicesWoolies, '\n');
    while (wooliesChoice == standardChoice) {
      wooliesChoice = choose(choicesWoolies, '\n');
    }
    res.send({ choices: { standard: standardChoice, woolies: wooliesChoice } });
  } catch (error) {
    res.send({ Error: error })
  }
});

app.listen(port, 'localhost', () => {
  console.log(`food-decision-making-machine: Server is running at http://localhost:${port}`);
});