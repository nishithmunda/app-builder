import useDragger from "../Hooks/useDragger";
import { useId, useRef, useState } from "react";

import { actionTypes } from "../ContextAPI/reducer";
import { useStateValue } from "../ContextAPI/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const ElementWrapper = ({
  childComp,
  type,
  properties,
  eleId_prop,
  item,
}) => {
  const [state, dispatch] = useStateValue();
  let uniqueId = eleId_prop;
  useDragger(uniqueId, type, { top: properties?.top, left: properties?.left });

  const handleDeleteItem = (uniqueId) => {
    dispatch({
      type: actionTypes.REMOVE_ELEMENT,
      payload: uniqueId,
    });
  };

  const handleSelect = (item) => {
    dispatch({
      type: actionTypes.ACTIVE_ELEMENT,
      payload: item,
    });
  };

  return (
    <div
      id={uniqueId}
      className="element__box"
      style={{
        top: properties?.top,
        left: properties?.left,
        width: `${properties?.width}px`
      }}
      onClick={() => handleSelect(item)}
    >
      {childComp(properties)}
      <DeleteIcon
        className="delete__icon"
        onClick={() => handleDeleteItem(eleId_prop)}
      />
      <DragIndicatorIcon className="dnd__icon" />
    </div>
  );
};
