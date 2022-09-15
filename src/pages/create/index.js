import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import QuestionCard from "../../components/question-card";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Create() {
  let [questions, setQuestions] = useLocalStorage("questions", []);
  let navigate = useNavigate();

  let _handleSubmit = (data) => {
    setQuestions([...questions, data]);
    navigate("/list");
  };

  return (
    <Container>
      <QuestionCard handleSubmit={_handleSubmit} />
    </Container>
  );
}
