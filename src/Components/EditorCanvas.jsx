import { useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { componentList } from "./data";
import { ElementWrapper } from "./ElementWrapper";
import { actionTypes } from "../ContextAPI/reducer";
import { useStateValue } from "../ContextAPI/StateProvider";

export const EditorCanvas = (props) => {
  const [state, dispatch] = useStateValue();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "abc",
    drop: (item) => handleAddItems(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleAddItems = (dragItem) => {
    let item = componentList.filter((data) => {
      return data?.type == dragItem?.type;
    });
    dispatch({
      type: actionTypes.ADD_ELEMENT,
      payload: { ...item?.[0], properties: { varient: "outlined" } },
    });
  };

  const handleAddFromLocalStorage = () => {
    let items = JSON.parse(localStorage.getItem(`state`)) || [];
    let updatedItem = items.map((item) => {
      let elementItem = componentList.filter((data) => {
        return data?.type == item?.type;
      });
      return {
        ...elementItem[0],
        eleId: item?.eleId,
        properties: {
          top: item?.top || 0,
          left: item?.left || 0,
        },
      };
    });
    dispatch({
      type: actionTypes.ADD_ELEMENT_FROM_STORAGE,
      payload: updatedItem || [],
    });
  };

  function drawBoard(p, bw, bh) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    for (var x = 0; x <= bw; x += 40) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "black";
    context.stroke();
  }
  useEffect(() => {
    // drawBoard(10, 400, 400);
    handleAddFromLocalStorage();
  }, []);

  return (
    <div
      className="canvas__screen"
      style={{ background: state?.canvasItems?.length === 0 && "#e9eef2" }}
    >
      {/* <canvas id="canvas" width="420px" height="420px"></canvas> */}
      <div className="canvas__screen__header">
        <h1>Design Board</h1>
      </div>

      <div className="canvas__screen__editor" ref={drop}>
        {state?.canvasItems?.length > 0 &&
          state?.canvasItems.map((item) => {
            return (
              <>
                <ElementWrapper
                  type={item?.type}
                  eleId_prop={item?.eleId}
                  childComp={item?.component}
                  properties={item?.properties}
                />
              </>
            );
          })}

        {state?.canvasItems?.length == 0 && (
          <h1 className="canvas__empty__screen">
            Drag & drop components here.
          </h1>
        )}
      </div>
    </div>
  );
};
