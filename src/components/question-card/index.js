import {
  Button,
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  Radio,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./index.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

export default function QuestionCard({
  handleSubmit,
  handleDeleteQuestion,
  data,
  index,
}) {
  const [state, setState] = useState({
    question: "",
    options: ["Option 1"],
    required: false,
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (data) {
      setState(data);
      setIsEditing(false);
    }
  }, [data]);
  let isFromList = index === 0 || index;
  let _handleChangeQuestion = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  let _handleChangeOption = (e, index) => {
    let options = JSON.parse(JSON.stringify(state.options));
    options[index] = e.target.value;
    setState({ ...state, options });
  };
  let _handleDeleteOption = (index) => {
    let options = JSON.parse(JSON.stringify(state.options));
    options.splice(index, 1);
    setState({ ...state, options });
  };
  let _handleRequiredSwitch = () => {
    setState({ ...state, required: !state.required });
  };
  let _handleAddOption = (index) => {
    let options = JSON.parse(JSON.stringify(state.options));
    options.push(`Option ${index}`);
    setState({ ...state, options });
  };
  let _handleSubmit = (e) => {
    e.preventDefault();
    if (isFromList) {
      setIsEditing(false);
      handleSubmit(state, index);
    } else {
      handleSubmit(state);
    }
  };
  let _handleDeleteQuestion = () => {
    handleDeleteQuestion(index);
  };
  return (
    <form onSubmit={_handleSubmit}>
      <Card sx={{ marginBottom: "20px" }}>
        <div className="question-card__content">
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                id="question"
                variant="standard"
                fullWidth
                required
                disabled={!isEditing}
                placeholder="Question"
                sx={{
                  "& .MuiInputBase-root": {
                    height: 50,
                  },
                }}
                value={state.question}
                onChange={_handleChangeQuestion}
              />
            </Grid>
          </Grid>
          {state.options.map((v, i) => (
            <Grid
              key={`option${state.question}${i}`}
              container
              sx={{ marginTop: "20px" }}
            >
              <Grid
                item
                xs={11}
                md={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Radio disabled />
                {isEditing ? (
                  <TextField
                    onChange={(e) => _handleChangeOption(e, i)}
                    value={v}
                    required
                    variant="standard"
                    onFocus={(e) => e.target.select()}
                    fullWidth
                  />
                ) : (
                  <p style={{ width: "100%" }}>{v}</p>
                )}
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {state.options.length > 1 && isEditing && (
                  <IconButton
                    color="neutral"
                    onClick={() => _handleDeleteOption(i)}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid container sx={{ marginTop: "20px" }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {isEditing && (
                <Button
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={() => _handleAddOption(state.options.length + 1)}
                >
                  <AddCircleIcon color="red" sx={{ marginRight: "20px" }} />
                  <span>Add Option</span>
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
        <div className="question-card__footer">
          {isEditing ? (
            <>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.required}
                    onChange={_handleRequiredSwitch}
                  />
                }
                label="Required"
              />
              <Button type="submit" variant="contained">
                {isFromList ? "Save" : "Submit"}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={_handleDeleteQuestion}
                sx={{ marginRight: "20px" }}
                color="error"
                variant="outlined"
              >
                <DeleteIcon /> <p>Delete</p>
              </Button>
              <Button onClick={() => setIsEditing(true)} variant="outlined">
                Edit
              </Button>
            </>
          )}
        </div>
      </Card>
    </form>
  );
}
