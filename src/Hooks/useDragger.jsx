import { useEffect, useId, useRef } from "react";

function useDragger(id, type, coordinate) {
  const isClicked = useRef(false);

  const coords = useRef({
    startX: coordinate?.left || 0,
    startY: coordinate?.top || 0,
    lastX: coordinate?.left || 0,
    lastY: coordinate?.top || 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e) => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;

      //Save
      let state = {
        type,
        eleId: id,
        top: target.offsetTop,
        left: target.offsetLeft,
      };

      localStorage.getItem(`state`) ||
        localStorage.setItem(`state`, JSON.stringify([]));
      let storageData = JSON.parse(localStorage.getItem(`state`));
      let updatedData = storageData;
      let filterDataIndex = updatedData.findIndex((data) => data?.eleId == id);
      if (filterDataIndex >= 0) {
        updatedData[filterDataIndex] = state;
      } else {
        updatedData.push(state);
      }
      localStorage.setItem(`state`, JSON.stringify(updatedData));
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    // container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      // container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);
}

export default useDragger;
