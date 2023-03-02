import { useId, useEffect } from "react";
import { useDrop } from "react-dnd";
import { componentList } from "../Data/ComponentList";
import { ElementWrapper } from "../ElementWrapper";
import { actionTypes } from "../../ContextAPI/reducer";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { Dragger } from "../CommonComponents/Draggable";
import { drawGrid } from "./util";
import "./style.css";

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
        properties: {
          varient: "outlined",
          lastX: 0,
          lastY: 0,
        },
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
          lastX: item?.lastX || 0,
          lastY: item?.lastY || 0,
        },
      };
    });
    dispatch({
      type: actionTypes.ADD_ELEMENT_FROM_STORAGE,
      payload: updatedItem || [],
    });
  };

  useEffect(() => {
    // drawGrid(10);
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
        {/* <canvas id="canvas"></canvas> */}
        {/* {state?.canvasItems?.length > 0 &&
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
          })} */}
        {state?.canvasItems?.length > 0 &&
          state?.canvasItems.map((item) => {
            return (
              <Dragger
                type={item?.type}
                eleId_prop={item?.eleId}
                childComponent={item?.component}
                properties={item?.properties}
                item={item}
              />
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
