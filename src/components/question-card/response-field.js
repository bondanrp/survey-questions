import {
  Grid,
  IconButton,
  Radio,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./index.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ResponseField({
  state,
  isEditing,
  _handleChangeOption,
  _handleDeleteOption,
  _handleAddOption,
}) {
  switch (state.type) {
    case "multiplechoice":
    case "checkbox":
      return (
        <>
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
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {state.type === "multiplechoice" ? (
                  <Radio disabled />
                ) : (
                  <Checkbox disabled />
                )}
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
          ))}{" "}
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
        </>
      );
    case "shortanswer":
      return (
        <p className="question-card__answer text-sub">Short answer text</p>
      );
    case "longanswer":
      return <p className="question-card__answer text-sub">Long answer text</p>;
    default:
      return <div />;
  }
}
