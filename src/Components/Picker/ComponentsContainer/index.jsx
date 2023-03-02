import { useDrag } from "react-dnd";

export const ComponentContainer = ({ details }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "abc",
    item: { type: details?.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="section__menu__item"
      ref={drag}
      style={{ border: isDragging && "5px solid pink" }}
    >
      <div className="component__image">{details?.icon}</div>
      <div className="section__menu__detail">
        <h1>{details?.name}</h1>
        <p>{details?.supportText}</p>
      </div>
    </div>
  );
};
