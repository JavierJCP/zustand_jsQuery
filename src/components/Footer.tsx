import { Button } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionData';
import { useQuestionStore } from '../store/question';

function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData;

  const reset = useQuestionStore((state) => state.reset);

  return (
    <footer style={{ marginTop: '20px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>

      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => reset()}>Resetear Juego</Button>
      </div>
    </footer>
  );
}

export default Footer;
