import axios from "axios";

const SET_COLLECTION = "SET_COLLECTION";
const ADD_TO_COLLECTION = "ADD_TO_COLLECTION";
const REMOVE_FROM_COLLECTION = "REMOVE FROM_COLLECTION"; //ak added
// const GUEST_ADD_TO_COLLECTION = "GUEST_ADD_TO_COLLECTION";
// const GUEST_REMOVE_FROM_COLLECTION = "GUEST_REMOVE_FROM_COLLECTION";
const CHECKOUT = "CHECKOUT"; //ak added

const initialState = { collectibles: [], totalCost: 0 };
//ak a collection is an array of collectibles, and need a total cost

const collection = (state = initialState, action) => {
  //ak
  switch (action.type) {
    case SET_COLLECTION:
      return {...state, ...action.collection};
    case ADD_TO_COLLECTION:
      return {
        //AK action.item, which is the current collection
        ...action.item,
      };
    // case GUEST_ADD_TO_COLLECTION:
    //   //ak from research
    //   const newCollectibles = state?.collectibles?.map((element) => {
    //     if (element.item.id === action.itemQty.item.id) {
    //       return {
    //         ...element,
    //         quantity: element.quantity + action.itemQty.quantity,
    //       };
    //     }
    //     return element;
    //   });
    //   // Check if an existing line item was found
    //   const foundExistingCollectible = newCollectibles?.some(
    //     (element) => element.item.id === action.itemQty.item.id
    //   );
    //   if (!foundExistingCollectible) {
    //     newCollectibles?.push({
    //       item: action.itemQty.item,
    //       quantity: action.itemQty.quantity,
    //     });
    //   }
    //   return { collectibles: newCollectibles };

    case REMOVE_FROM_COLLECTION:
      return {
        ...state,
        ...action.item,
      };
    // case GUEST_REMOVE_FROM_COLLECTION:
    //   const newCollectibles2 = state.collectibles.filter(
    //     (element) => element.item.id !== action.itemQty.item.id //ak note
    //   );

    //   return { collectibles: newCollectibles2 };
    case CHECKOUT:
      return {
        ...state,
        ...action.collection,
      };
    case "LOG_OUT_COLLECTION":
      return action.collection;
    default:
      return state;
  }
};

//ACTION CREATORS
export const setCollection = (collection) => ({
  type: SET_COLLECTION,
  collection,
});

export const addToCollection = (item) => ({
  type: ADD_TO_COLLECTION,
  item,
});

export const logOutCollection = () => {
  return { type: "LOG_OUT_COLLECTION", collection: {} };
};

export const guestAddToCollection = (itemQty) => ({
  type: GUEST_ADD_TO_COLLECTION,
  itemQty, //ak this is an object w/ item & qty
});

export const removeFromCollection = (item) => ({
  type: REMOVE_FROM_COLLECTION,
  item,
});

export const guestRemoveFromCollection = (itemQty) => ({
  type: GUEST_REMOVE_FROM_COLLECTION,
  itemQty, //ak this is an object w/ item & qty
});

export const checkOut = (collection) => ({
  type: CHECKOUT,
  collection,
});

// Thunks
export const checkOutCollection = (collection, orderTotal) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  console.log("collection, orderTotal", collection, orderTotal);
  collection.orderTotal = orderTotal;//updates total
  const response = await axios.put("/api/checkout", {...collection, orderTotal}, {
    //ak need body as a {}
    headers: {
      authorization: token,
    },
  });
  console.log("response.data", response.data)
  dispatch(checkOut(response.data));
};

export const fetchCollection = (collection) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const response = await axios.get("/api/collection", {
      headers: {
        authorization: token,
      },
    });
    dispatch(setCollection(response.data)); //if user logged in
  } else dispatch(setCollection(collection));
};

export const addItemToCollection = (item, quantity) => async (dispatch) => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    // Handle guest scenario
    dispatch(guestAddToCollection({ item, quantity }));
    return;
  }
  try {

    //*****begin ebay test
    //export const ebaySearchThunk = (itemName) =>{
      const EBAY_APP_ID = 'AlanKoh-Qurio-PRD-10ef64d5f-52b826ae'; // Replace with your eBay App ID
      // Function to search for items using the eBay Finding API
      async function searchItems(item) {
        try {
          const response = await axios.get('https://svcs.ebay.com/services/search/FindingService/v1', {
            params: {
              'OPERATION-NAME': 'findItemsByKeywords',
              'SERVICE-VERSION': '1.0.0',
              'SECURITY-APPNAME': EBAY_APP_ID,
              'RESPONSE-DATA-FORMAT': 'JSON',
              'keywords': item.name,
            },
          });
          console.log("ebay response data", response.data)
          return response.data;
        } catch (error) {
          console.error('Error ebay Thunk search items:', error);
          throw error;
        }
      }
      //***End ebay test */
      searchItems(item);
    const response = await axios.post(
      "/api/collection",
      { item, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(addToCollection(response.data));
  } catch (error) {
    console.error("Error adding item to collection:", error);
  }
};

//ak added remove from collection thunk
export const removeItemFromCollection =
  (item, quantity = 1) =>
  async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const response = await axios.put(
          `/api/collection`,
          { item, quantity },
          {
            headers: { authorization: token },
          }
        );
        dispatch(removeFromCollection(response.data));
      } else dispatch(guestRemoveFromCollection({ item, quantity }));
    } catch (error) {
      console.error("Error deleting collectible", error);
    }
  };

export default collection;
