import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getItemById,
  deleteItemThunk,
  addReview,
  getReviewsByItemId,
  postReviewThunk,
  deleteReviewThunk,
  addToCollection,
  addItemToCollection,
} from "../store";

const SingleItem = () => {
  const { id } = useParams();
  console.log("useParams ID", id)
  const [item, setItem] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
        //dispatch(getReviewsByItemId(id));
      } catch (error) {
        window.alert("Failed to fetch item:", error);
      }
    };
    getItem();
  }, [id, dispatch]);

  const handleAddtoCollection = () => {
    if (item) {
      const qty = Number(quantity) || 1;
      dispatch(addItemToCollection(item, qty));
      //window.alert("Item successfully added!");
    }
  };

  // const handlePostReview = async () => {
  //   try {
  //     const reviewData = {
  //       itemId: id,
  //       userId: user.id,
  //       content: review,
  //       rating: rating,
  //     };
  //     dispatch(postReviewThunk(reviewData));
  //     setReview("");
  //     setRating(1);
  //     window.alert("Review posted successfully.");
  //   } catch (error) {
  //     window.alert("Failed to post review:", error);
  //   }
  // };

  // const handleDeleteReview = async (reviewId) => {
  //   try {
  //     await dispatch(deleteReviewThunk(reviewId));
  //   } catch (error) {
  //     window.alert("Failed to delete review:", error);
  //   }
  // };

  const handleDeleteItem = async () => {
    try {
      dispatch(deleteItemThunk(id));
      window.alert("Item deleted successfully, redirecting to main page.");
      navigate("/");
    } catch (error) {
      window.alert("Failed to delete item.", error);
    }
  };

  return (
    <div className=".sItem-card" >
      {item ? (
        <>
          <div className="sImage-div">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="sItem-image"
            />
          </div>
          <div className="sItem-details">
            <h2 className="sItem-title">{item.name}</h2>
            <p>Latest Value: Placeholder{item.price}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.toyline}</p>
            {user.isAdmin && (
              <button onClick={handleDeleteItem}>Delete Item</button>
            )}
          
        

            <p>Quantity: </p>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                if (e.target.value === "") {
                  setQuantity("");
                } else {
                  setQuantity(Math.max(0, e.target.value));
                }
              }}
              min="0"
            />
            <button className="sItem-addToCollection" onClick={handleAddtoCollection}>
              Add to Collection
            </button>
          </div>

          {/* <div className="sItem-reviews">
            <h2>Reviews:</h2>
            {reviews.map((review) => (
              <div key={review.id}>
                <p>
                  Posted by: {review.user.username} <br />
                  Rating: {review.rating} <br />
                  Review: {review.content} <br />
                  {user.id === review.userId && (
                    <button onClick={() => handleDeleteReview(review.id)}>
                      Delete
                    </button>
                  )}
                </p>
              </div>
            ))}
            {user ? (
              <div className="sItem-reviewForm">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here"
                />
                <label>
                  Rating:
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </label>
                <button onClick={handlePostReview}>Post Review</button>
              </div>
            ) : (
              <p>Login to write a review</p>
            )}
          </div> */}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleItem;
