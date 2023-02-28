export const initialState = {
  canvasItems: [],
};

export const actionTypes = {
  ADD_ELEMENT_FROM_STORAGE: "ADD_ELEMENT_FROM_STORAGE",
  ADD_ELEMENT: "ADD_ELEMENT",
  REMOVE_ELEMENT: "REMOVE_ELEMENT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ELEMENT_FROM_STORAGE:
      return {
        ...state,
        canvasItems: action.payload,
      };
    case actionTypes.ADD_ELEMENT:
      return {
        ...state,
        canvasItems: [...state.canvasItems, action.payload],
      };
    case actionTypes.REMOVE_ELEMENT:
      const updatedItem = [];
      const updatedState = state?.canvasItems
        ?.map((val) => {
          if (val?.eleId != action.payload) {
            updatedItem.push(val);
            return {
              eleId: val?.eleId,
              top: val?.properties?.top,
              type: val?.type,
              left: val?.properties?.left,
            };
          }
        })
        .filter((notUndefined) => notUndefined !== undefined);

      console.log({ updatedState });
      localStorage.setItem("state", JSON.stringify(updatedState));
      return {
        ...state,
        canvasItems: updatedItem,
      };
    default:
      return state;
  }
};

export default reducer;
