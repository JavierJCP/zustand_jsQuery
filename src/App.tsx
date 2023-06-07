import { Container, Typography, Stack } from '@mui/material';
import JavaScriptLogo from './components/JavaScriptLogo';
import { Start } from './Start';
import { useQuestionStore } from './store/question';
import { Game } from './components/Game';
import './App.css';

function App() {
  const questions = useQuestionStore((state) => state.questions);
  console.log(questions);
  return (
    <div>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </div>
  );
}

export default App;
