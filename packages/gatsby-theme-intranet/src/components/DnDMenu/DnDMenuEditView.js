import clsx from "clsx";
import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  DraggableComponent,
  handleOnDragEnd,
  getListStyle,
} from "../../hooks/useDndMenu";

import * as styles from "./DnDMenu.module.css";
import { DnDContainerContext } from "./DnDMenuContainer";


export default function DnDMenuEditView({ ...restProps }) {
  const [DnDContext, setDnDContext] = useContext(DnDContainerContext);

  const { draggableItemsToShow, draggableItemsToHide } = DnDContext;

  let DnDLists = {
    droppableList1: "draggableItemsToShow",
    droppableList2: "draggableItemsToHide",
  };

  const getList = (id) => DnDContext[DnDLists[id]];


  return (
    <DragDropContext
      onDragEnd={(result) =>
        handleOnDragEnd(result, getList, setDnDContext, DnDContext)
      }
    >
      <Droppable droppableId="droppableList1">
        {(provided, snapshot) => (
          <ul
            className={clsx(styles.list, styles.edit, styles.editVisible)}
            ref={provided.innerRef}
            style={getListStyle(snapshot)}
            {...restProps}
          >
            {draggableItemsToShow.map((item, index) => (
              <DraggableComponent
                Draggable={Draggable}
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

      <Droppable droppableId="droppableList2">
        {(provided, snapshot) => (
          <ul
            className={clsx(styles.list, styles.edit, styles.editHidden)}
            ref={provided.innerRef}
            style={getListStyle(snapshot)}
            {...restProps}
          >
            {draggableItemsToHide?.map((item, index) => (
              <DraggableComponent
                Draggable={Draggable}
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
