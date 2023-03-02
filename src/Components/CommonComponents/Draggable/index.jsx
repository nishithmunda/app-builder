import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { actionTypes } from "../../../ContextAPI/reducer";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import "./style.css";

export const Dragger = ({
  childComponent,
  type,
  properties,
  eleId_prop,
  item,
}) => {
  const [state, dispatch] = useStateValue();
  const [currentPosition, setCurrentPosition] = useState({
    xRate: properties?.lastX,
    yRate: properties?.lastY,
  });

  const onDrag = (e, data) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };

  const onStop = (e, data) => {
    let state = {
      type: type,
      eleId: eleId_prop,
      lastX: data?.lastX,
      lastY: data?.lastY,
    };
    localStorage.getItem(`state`) ||
      localStorage.setItem(`state`, JSON.stringify([]));
    let storageData = JSON.parse(localStorage.getItem(`state`));
    let updatedData = storageData;
    let filterDataIndex = updatedData.findIndex(
      (data) => data?.eleId == eleId_prop
    );
    if (filterDataIndex >= 0) {
      updatedData[filterDataIndex] = state;
    } else {
      updatedData.push(state);
    }
    localStorage.setItem(`state`, JSON.stringify(updatedData));
  };

  const handleDeleteItem = (id) => {
    dispatch({
      type: actionTypes.REMOVE_ELEMENT,
      payload: id,
    });
  };

  const handleSelect = (item) => {
    dispatch({
      type: actionTypes.ACTIVE_ELEMENT,
      payload: item,
    });
  };

  return (
    <Draggable
      // handle="strong"
      bounds="parent"
      position={{
        x: currentPosition.xRate,
        y: currentPosition.yRate,
      }}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div
        className="child__wrapper element__box"
        onClick={() => handleSelect(item)}
      >
        {/* <strong
          style={{ position: "absolute", left: 0, top: -25 }}
          className={"move__icon"}
        >
          <ControlCameraIcon />
        </strong> */}
        {childComponent(properties)}
        <CloseIcon
          className={"delete__icon"}
          onClick={() => handleDeleteItem(eleId_prop)}
        />
      </div>
    </Draggable>
  );
};
