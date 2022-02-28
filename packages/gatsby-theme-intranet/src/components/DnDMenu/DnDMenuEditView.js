import { arrayMoveImmutable } from "array-move";
import clsx from "clsx";
import React, { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { DraggableComponent } from "../../hooks/useDndMenu";

import * as styles from "./DnDMenu.module.css";
import { DnDContainerContext } from "./DnDMenuContainer";

export default function DnDMenuEditView({ ...restProps }) {
  const { items, visibleItemCount, onChange } = useContext(DnDContainerContext);

  let draggableItems = [
    ...items.slice(0, visibleItemCount),
    { id: "SEPARATOR" },
    ...items.slice(visibleItemCount),
  ];

  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        if (!destination) {
          return;
        }
        let newItems = arrayMoveImmutable(
          draggableItems,
          source.index,
          destination.index,
        );
        let result = {
          items: newItems.filter((item) => item.id !== "SEPARATOR"),
          visibleItemCount: newItems.findIndex(
            (item) => item.id === "SEPARATOR",
          ),
        };
        onChange(result);
      }}
    >
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            className={clsx(styles.list, styles.edit, styles.editVisible)}
            ref={provided.innerRef}
            {...restProps}
          >
            {draggableItems.map((item, index) => (
              <DraggableComponent
                item={item}
                index={index}
                styles={styles}
                key={item.id}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
