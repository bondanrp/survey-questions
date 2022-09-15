import { Container } from "@mui/system";
import QuestionCard from "../../components/question-card";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function List() {
  let [questions, setQuestions] = useLocalStorage("questions", []);
  let _handleSubmit = (data, index) => {
    let questionsCopy = JSON.parse(JSON.stringify(questions));
    questionsCopy[index] = data;
    setQuestions(questionsCopy);
  };
  let _handleDeleteQuestion = (index) => {
    let questionsCopy = JSON.parse(JSON.stringify(questions));
    questionsCopy.splice(index, 1);
    setQuestions(questionsCopy);
  };

  return (
    <div>
      <Container>
        {questions.map((v, i) => {
          return (
            <QuestionCard
              index={i}
              key={`question${i}${v.question}`}
              data={v}
              handleSubmit={_handleSubmit}
              handleDeleteQuestion={_handleDeleteQuestion}
            />
          );
        })}
      </Container>
    </div>
  );
}
