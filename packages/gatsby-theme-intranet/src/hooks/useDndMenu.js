import { Icon } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

/**
 * a little function to help us with reordering the result
 */
export const reorderItems = (list, sourceIndex, destinationIndex) => {
  const result = Array.from(list);
  const [removedItem] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removedItem);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const moveItems = (
  sourceList,
  destinationList,
  droppableSource,
  droppableDestination,
) => {
  const sourceListClone = Array.from(sourceList);
  const destinationListClone = Array.from(destinationList);
  const [removedItem] = sourceListClone.splice(droppableSource.index, 1);

  destinationListClone.splice(droppableDestination.index, 0, removedItem);

  const result = {};
  result[droppableSource.droppableId] = sourceListClone;
  result[droppableDestination.droppableId] = destinationListClone;

  return result;
};

export const handleOnDragEnd = (result, getList, setContext, context) => {
  const { source, destination } = result;

  // dropped outside the lists
  if (!destination) return;

  if (source.droppableId === destination.droppableId) {
    const reorderedListItems = reorderItems(
      getList(source.droppableId),
      source.index,
      destination.index,
    );

    let itemsState = { draggableItemsToShow: reorderedListItems };

    if (source.droppableId === "droppableList2") {
      itemsState = { draggableItemsToHide: reorderedListItems };
    }

    setContext({
      ...context,
      ...itemsState,
    });
  } else {
    const movedItems = moveItems(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination,
    );

    setContext({
      ...context,
      draggableItemsToShow: movedItems.droppableList1,
      draggableItemsToHide: movedItems.droppableList2,
    });
  }
};

// DraggableComponent.propTypes = {
//   Draggable: PropTypes.elementType,
//   item: PropTypes.shape({
//     id: PropTypes.any.isRequired,
//     label: PropTypes.node,
//   }).isRequired,
//   index: PropTypes.any,
//   styles: PropTypes.objectOf(PropTypes.string).isRequired,
// };

/**
 * Draggable Component
 */
export const DraggableComponent = ({ Draggable, item, index, styles }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot, provided.draggableProps.style)}
        >
          <div className={clsx(styles.link)} style={getItemLinkStyle(snapshot)}>
            <span
              className={clsx(
                styles.linkLabel,
                snapshot.isDragging &&
                  snapshot.draggingOver === "droppableList1" &&
                  styles.linkLabelFilled,
                snapshot.isDragging &&
                  snapshot.draggingOver === "droppableList2" &&
                  styles.linkLabelNotFilled,
              )}
            >
              {item.label}
            </span>
            <Icon
              name="move"
              className={clsx(
                styles.linkIcon,
                snapshot.isDragging &&
                  snapshot.draggingOver === "droppableList1" &&
                  styles.linkIconInverse,
              )}
            />
          </div>
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
