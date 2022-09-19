import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./index.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponseField from "./response-field";
import useDidMountEffect from "../../hooks/useDidMountEffect";

export default function QuestionCard({
  handleSubmit,
  handleDeleteQuestion,
  index,
  isEditing,
  setEditing,
  questions,
  data,
}) {
  const [state, setState] = useState(data);
  let [showSnackbar, setShowSnackbar] = useState(false);

  useDidMountEffect(() => {
    if (!isEditing) {
      handleSubmit(state, index);
    }
  }, [isEditing]);

  let _handleChangeQuestion = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  let _handleChangeType = (e) => {
    setState({ ...state, type: e.target.value });
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
    handleSubmit(state, index);
    setEditing(false);
    setShowSnackbar(true);
  };
  let _handleDeleteQuestion = () => {
    handleDeleteQuestion(index);
  };

  let typeOptions = [
    { value: "multiplechoice", label: "Multiple Choice" },
    { value: "checkbox", label: "Check Box" },
    { value: "shortanswer", label: "Short Answer" },
    { value: "longanswer", label: "Long Answer" },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Question Saved!"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Question Saved!
        </Alert>
      </Snackbar>
      <form onSubmit={_handleSubmit}>
        <div onClick={() => setEditing(state.id)}>
          <div
            className={`question-card__content ${isEditing ? "-active" : ""}`}
          >
            <Grid container>
              {isEditing ? (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="question"
                      variant="filled"
                      fullWidth
                      placeholder="Question"
                      sx={{
                        "& .MuiInputBase-root": {
                          // height: 0,
                          fontSize: "20px",
                        },
                      }}
                      value={state.question}
                      onChange={_handleChangeQuestion}
                    />
                  </Grid>
                  <Grid item xs={0} md={1} />
                </>
              ) : (
                <Grid item xs={12}>
                  <p className="question-card__question">
                    {state.question || "Question"}
                    {state.required && <span className="-required">*</span>}
                  </p>
                </Grid>
              )}
              <Grid item xs={12} md={5} sx={{ display: "flex" }}>
                {isEditing ? (
                  <Select
                    variant="filled"
                    fullWidth
                    value={state.type}
                    label="Type"
                    onChange={_handleChangeType}
                  >
                    {typeOptions.map((v, i) => {
                      return (
                        <MenuItem key={`${index}options${i}`} value={v.value}>
                          {v.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : null}
              </Grid>
            </Grid>
            <ResponseField
              state={state}
              isEditing={isEditing}
              _handleAddOption={_handleAddOption}
              _handleChangeOption={_handleChangeOption}
              _handleDeleteOption={_handleDeleteOption}
            />
          </div>
          {isEditing ? (
            <div className="question-card__footer">
              {questions.length > 1 && (
                <div className="question-card__delete">
                  <IconButton color="neutral" onClick={_handleDeleteQuestion}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
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
                Save
              </Button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
