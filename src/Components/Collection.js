import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import {removeItemFromCollection,} from "../store/collection";

//AK requirements:
// A logged in user should be able to
// 1. see the items in their collection
// 2. add a new item to their collection
// 3. remove an item from their collection
// 4. create an order (by checking out)
// 5. A non-logged in user should be able to add to their collection and have those items added to their collection after authenticating
// additional:
// 6. goes to a user info/payment page when logged in user 'checks out'
// 7. (OPTIONAL) decrement inventory when checking out ()

const Collection = (props) => {
  const { collection } = useSelector((state) => state);
  const dispatch = useDispatch();

  //AK will be delete item
  const handleDeleteCollectible = (item) => {
    if (item) {
      props.removeFromCollection({ ...item });
    }
  };

  const grandTotal = collection?.collectibles?.reduce((sum, collectible)=>{ 
    return sum + (collectible.item.price_paid * collectible.quantity);
    },0);


  const { auth } = props;
  return (
    <div className="collection-container">
      {collection.collectibles?.length === 0 ? (
        <h1 colSpan="5">Nothing in Collection</h1>
      ):(
      <>
        <h1>Collection</h1>
        <table>
          <tbody>
            <tr className="tr-left">
              <th colSpan={2}>Item</th>
              <th>  Qty Owned  </th>
              <th>  Price Paid  </th>
              <th>   Total Value</th>
            </tr>
                  {collection?.collectibles?.map((collectible) => (
                      <tr key={collectible.item.id}>
                        <td> 
                        {collectible.item.name}
                        </td>
                        <td>
                          <img 
                            src={collectible.item.imageUrl} 
                            style={{ maxHeight: "100px", maxWidth: "150", margin:"10px" }}
                          />
                        </td>
                        <td>{collectible.quantity}</td>
                        <td>${collectible.price_paid}</td>
                        {/* <td>${collectible.item.price * collectible.quantity}</td> */}
                        <td >${(collectible.item.value)}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleDeleteCollectible(collectible.item);
                            }}>Remove from Collection                   
                          </button>
                        </td>
                      </tr>
                  )
                  )}
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>Total Collection Value</td>
              <td style={{ textAlign: "right" }}>{grandTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td></td>
            </tr>
          </tbody>
        </table>   
      </>
      )
      }
    </div>)
}
//AK update thunks here, change addItemToCollection to 'Checkout'

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addToCollection: (item) => dispatch(addItemToCollection(item)),
  //ak remove collectible, similar to deleteReviewThunk
  removeFromCollection: (item) => dispatch(removeItemFromCollection(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
