import { DragIndicator } from "@mui/icons-material";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import AddCard from "./add-card";
import "./index.scss";

export const DndCard = ({
  id,
  index,
  moveCard,
  children,
  isEditing,
  handleAddQuestion,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <>
      <div
        className={`dnd-card__container ${isEditing ? "-active" : ""}`}
        ref={preview}
        style={{ opacity }}
        data-handler-id={handlerId}
      >
        <div ref={ref} className="dnd-card__handle">
          <DragIndicator className="dnd-card__handle__icon" />
        </div>
        {children}
      </div>
      {isEditing && <AddCard onClick={handleAddQuestion} index={index} />}
    </>
  );
};
