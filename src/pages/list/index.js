import { Container } from "@mui/system";
import AnswerCard from "../../components/answer-card";
import { useAppContext } from "../../context/context";

export default function List() {
  let { questions } = useAppContext();
  return (
    <Container maxWidth="md">
      <div style={{ background: "#fff" }}>
        {!questions.length && <p>You have not created any question.</p>}
        {questions.map((v, i) => {
          return <AnswerCard data={v} key={`answer${v.id}`} index={i} />;
        })}
      </div>
    </Container>
  );
}
