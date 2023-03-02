import { useState,useId, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { componentList } from "./data";
import { ElementWrapper } from "./ElementWrapper";
import { actionTypes } from "../ContextAPI/reducer";
import { useStateValue } from "../ContextAPI/StateProvider";

export const EditorCanvas = (props) => {
  const [state, dispatch] = useStateValue();
  const eleId = useId();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "abc",
    drop: (item) => handleAddItems(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleAddItems = (dragItem) => {
    const time = new Date().valueOf();
    let item = componentList.filter((data) => {
      return data?.type == dragItem?.type;
    });
    dispatch({
      type: actionTypes.ADD_ELEMENT,
      payload: {
        ...item?.[0],
        eleId: `${eleId}-${item?.[0]?.type}-${time}`,
        properties: { varient: "outlined" },
      },
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

  function drawBoard(p) {
    let canvasContainer = document.getElementById("canvas_container");
    let parentHeight = canvasContainer.offsetHeight;
    let parentWidth = canvasContainer.offsetWidth;
    let canvas = document.getElementById("canvas");
    canvas.width = parentWidth - 40;
    canvas.height = parentHeight - 40;
    let context = canvas.getContext("2d");
    for (let x = 0; x <= parentWidth; x += 25) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, parentHeight + p);
    }

    for (let x = 0; x <= parentHeight; x += 25) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(parentWidth + p, 0.5 + x + p);
    }
    context.strokeStyle = "#e9eff2";
    context.stroke();
  }

  useEffect(() => {
    drawBoard(10);
    handleAddFromLocalStorage();
  }, []);

  return (
    <div
      className="canvas__screen"
      style={{ background: state?.canvasItems?.length === 0 && "#e9eef2" }}
    >
      <div className="canvas__screen__header">
        <h1>Design Board</h1>
      </div>

      <div id="canvas_container" className="canvas__screen__editor" ref={drop}>
        <canvas id="canvas"></canvas>
        {state?.canvasItems?.length > 0 &&
          state?.canvasItems.map((item) => {
            return (
              <>
                <ElementWrapper
                  type={item?.type}
                  eleId_prop={item?.eleId}
                  childComp={item?.component}
                  properties={item?.properties}
                  item={item}
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
