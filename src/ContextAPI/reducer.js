export const initialState = {
  canvasItems: [],
  activeElement: {},
};

export const actionTypes = {
  ADD_ELEMENT_FROM_STORAGE: "ADD_ELEMENT_FROM_STORAGE",
  ADD_ELEMENT: "ADD_ELEMENT",
  REMOVE_ELEMENT: "REMOVE_ELEMENT",
  ACTIVE_ELEMENT: "ACTIVE_ELEMENT",
  CHANGE_PROPERTIES: "CHANGE_PROPERTIES",
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
    case actionTypes.ACTIVE_ELEMENT:
      return {
        ...state,
        activeElement: action.payload,
      };
    case actionTypes.CHANGE_PROPERTIES:
      let filterElement = state.canvasItems.map((element) => {
        if (element.eleId == action.payload.eleId) {
          return { ...element, properties: action.payload.targetEleProperties };
        } else {
          return element;
        }
      });
    return {
      ...state,
      canvasItems: filterElement,
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

      //Update in local Storage
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
