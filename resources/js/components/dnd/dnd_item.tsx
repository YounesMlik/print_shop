import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DndItem(props: { id: string; children: ReactNode }) {
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    position: isDragging ? 'relative' as const : 'static' as const, // z-index only works on positioned elements
  };

  const className = "border border-white/30 dark:border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 bg-white/20 dark:bg-white/5" +
    (isDragging
      ? 'outline outline-2 outline-blue-400'
      : '');

  return (
    <div className={className}
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