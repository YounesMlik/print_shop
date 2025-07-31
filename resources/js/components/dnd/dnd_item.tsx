import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DndItem(props: { id: string; children: ReactNode }) {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-describedby="dnd"
    >
      {props.children}
    </div>
  );
}