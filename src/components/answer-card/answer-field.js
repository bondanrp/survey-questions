import {
  Grid,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import "./index.scss";

export default function AnswerField({ data }) {
  switch (data.type) {
    case "multiplechoice":
      return (
        <RadioGroup>
          {data.options.map((v, i) => (
            <Grid
              key={`option${data.question}${i}`}
              container
              sx={{ marginTop: "20px" }}
            >
              <FormControlLabel value={v} control={<Radio />} label={v} />
            </Grid>
          ))}
        </RadioGroup>
      );
    case "checkbox":
      return (
        <FormGroup>
          {data.options.map((v, i) => {
            return (
              <FormControlLabel
                key={`cb${data.question}${i}`}
                control={<Checkbox />}
                label={v}
              />
            );
          })}
        </FormGroup>
      );
    case "shortanswer":
      return (
        <TextField
          variant="standard"
          placeholder={data.question}
          fullWidth
          sx={{
            marginTop: "20px",
          }}
        />
      );
    case "longanswer":
      return (
        <TextField
          multiline
          placeholder={data.question}
          variant="standard"
          fullWidth
          sx={{
            marginTop: "20px",
          }}
        />
      );
    default:
      return <div />;
      break;
  }
}
