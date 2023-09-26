import axios from "axios";

const initialState = {
  list: [],
  selecteditem: null,
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return { ...state, list: action.c };
    case "ADD_ITEM":
      return { ...state, list: [...state.list, action.item] };
    case "DELETE_ITEM":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
  }
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      list: [...state.list, action.item],
    };
  }
  return state;
};

export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const delItem = (id) => ({
  type: "DELETE_ITEM",
  id,
});

// GET all items
export const getAllItems = async () => {
  try {
    const response = await axios.get("/api/items");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching items");
  }
};

// GET items by category
export const getItemsByCategory = async (category) => {
  try {
    const response = await axios.get(`/api/items/${category}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching items by category");
  }
};

// GET single item by ID
export const getItemById = async (id) => {
  try {
    const response = await axios.get(`/api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// POST single item (Admin only)
export const createitem = async (itemData) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/items", itemData, {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating item");
  }
};

//POST thunk for single item Admin only
export const createItemThunk = (itemData) => {
  return async (dispatch) => {
    try {
      const item = await createitem(itemData);
      dispatch(additem(item));
    } catch (error) {
      throw new Error("Error creating item");
    }
  };
};

// PUT single item details (Admin only)
export const updateItem = async (id, itemData) => {
  try {
    const response = await axios.put(`/api/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating item");
  }
};

// DELETE single item (Admin only) axios call
export const deleteItem = async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/items/${id}`, {
      headers: { authorization: token },
    });
  } catch (error) {
    throw new Error("Error deleting item");
  }
};

// DELETE thunk for single item Admin only
export const deleteItemThunk = (id) => {
  return async (dispatch) => {
    try {
      await deleteItem(id);
      dispatch(delItem(id));
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };
};


export default item;
