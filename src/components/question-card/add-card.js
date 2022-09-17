import { Add } from "@mui/icons-material";

export default function AddCard({ onClick, index }) {
  let options = [
    { label: "Multiple Choice", value: "multiplechoice" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Short Answer", value: "shortanswer" },
    { label: "Long Answer", value: "longanswer" },
  ];
  return (
    <div className="question-card__add">
      <Add />
      {options.map((v, i) => {
        return (
          <button
            key={`optionadd${i}`}
            type="button"
            onClick={() => {
              onClick(index, v.value);
            }}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
