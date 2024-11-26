export const addToCart = (item) => {
    return {
      type: "ADD_TO_CART",
      payload: item,
    };
  };

  export const removeFromCart = (id, height_cm) => {
    return {
      type: "REMOVE_FROM_CART",
      payload: { id, height_cm },
    };
  };
  
  export const increment = (id, height_cm) => {
    return {
      type: "INCREMENT",
      payload: { id, height_cm },
    };
  };
  
  export const decrement = (id, height_cm) => {
    return {
      type: "DECREMENT",
      payload: { id, height_cm },
    };
  };

  export const clearALL = () => {
    return{
      type: "CLEAR_CART",
    }
  }
  