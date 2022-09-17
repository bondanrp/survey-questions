import { Grid } from "@mui/material";
import AnswerField from "./answer-field";
import "./index.scss";

export default function AnswerCard({ data, index }) {
  return (
    <div className="answer-card">
      <Grid container>
        <Grid item xs={12} md={6}>
          <p className="answer-card__question">
            {index + 1}. {data.question || "Question"}
            {data.required && <span className="-required">*</span>}
          </p>
        </Grid>
      </Grid>
      <AnswerField data={data} />
    </div>
  );
}
