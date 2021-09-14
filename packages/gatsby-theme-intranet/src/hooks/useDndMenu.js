import { Icon } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

/**
 * Draggable Component
 */
export const DraggableComponent = ({ item, index, styles }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot, provided.draggableProps.style)}
        >
          {item.id === "SEPARATOR" ? (
            <div role="separator" className={styles.separator} />
          ) : (
            <div
              className={clsx(styles.link)}
              style={getItemLinkStyle(snapshot)}
            >
              <span className={clsx(styles.linkLabel)}>{item.label}</span>
              <Icon name="reorder" className={clsx(styles.linkIcon)} />
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

/**
 * Styling
 */
export const getItemStyle = ({ ...props }, draggableStyle) => {
  void props;
  return {
    userSelect: "none",
    ...draggableStyle,
  };
};

export const getItemLinkStyle = ({ isDragging, draggingOver }) => {
  return {
    background:
      isDragging && draggingOver === "droppableList1" && "var(--color-active)",
    color:
      isDragging &&
      draggingOver === "droppableList1" &&
      "var(--navigation-active-color)",
    borderRadius:
      isDragging && draggingOver === "droppableList1" && "var(--space-4)",
  };
};

export const getListStyle = ({ isDraggingOver }) => {
  return {
    background: isDraggingOver && "none",
  };
};
