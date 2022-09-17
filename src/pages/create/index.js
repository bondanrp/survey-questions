import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import QuestionCard from "../../components/question-card";
import { useAppContext } from "../../context/context";
import update from "immutability-helper";
import { DndCard } from "../../components/question-card/card";
import generateID from "../../helper/id-generator";
import "./index.scss";

export default function Create() {
  let { questions, setQuestions } = useAppContext();
  let [selected, setSelected] = useState(questions[0].id);

  let _handleSubmit = useCallback((data, index) => {
    setQuestions((prevQuestion) =>
      update(prevQuestion, {
        $splice: [[index, 1, data]],
      })
    );
  }, []);
  let _handleSelect = (index) => {
    setSelected(index);
  };
  let _handleDeleteQuestion = useCallback((index) => {
    setQuestions((prevQuestion) =>
      update(prevQuestion, {
        $splice: [[index, 1]],
      })
    );
  }, []);
  let _handleAddQuestion = useCallback((index, type = "multiplechoice") => {
    let id = generateID();
    let newQuestion = {
      question: "",
      options: ["Option 1", "Option 2"],
      required: false,
      type: type,
      id,
    };
    let newIndex = index + 1;
    setQuestions((prevQuestion) =>
      update(prevQuestion, {
        $splice: [[newIndex, 0, newQuestion]],
      })
    );
    setSelected(id);
  }, []);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setQuestions((prevQuestion) =>
      update(prevQuestion, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevQuestion[dragIndex]],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((value, index, children, isEditing) => {
    return (
      <DndCard
        key={value.id}
        index={index}
        id={value.id}
        isEditing={isEditing}
        moveCard={moveCard}
        handleAddQuestion={_handleAddQuestion}
      >
        {children}
      </DndCard>
    );
  }, []);

  return (
    <Container className="create-page" maxWidth="md">
      {questions.map((v, i) => {
        let isEditing = v.id === selected;
        return renderCard(
          v,
          i,
          <QuestionCard
            questions={questions}
            index={i}
            key={`question${i}${v.question}`}
            data={v}
            isEditing={isEditing}
            handleSubmit={_handleSubmit}
            setEditing={_handleSelect}
            handleDeleteQuestion={_handleDeleteQuestion}
          />,
          isEditing
        );
      })}
    </Container>
  );
}
