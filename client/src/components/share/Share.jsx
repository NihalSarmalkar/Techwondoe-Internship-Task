import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Rating } from 'react-simple-star-rating'

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [rating, setRating] = useState(0) // initial rating value
  const [title,setTitle] = useState('');
  const [review,setReview] = useState('');
  const [streamApp,setStreamApp] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        userId:user._id,
        title,
        review,
        rating,
        streamApp,
        
      };
      console.log(user._id)
      console.log(review)
      console.log(rating)
      console.log(user.accessToken)
      await axios.post("/posts",data,{
        headers :{
          'token':`Bearer ${user.accessToken}`
        },
      })
      
   
      
      window.location.reload();
    } catch (err) {}
  };

  const handleRating = (rate: number) => {
    setRating(rate)
    // other logic
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <label>Title</label>
          
          <input
            placeholder={" What was the title of show you watched " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="shareTop">
        <label>Streaming App</label>
          
          <input
            placeholder={"Which streaming platform you have used  " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setStreamApp(e.target.value)}
          />
        </div>
        <div className="shareTop">
        <label>Rating</label>
          
        <div className='App'>
      <Rating  onClick={handleRating} ratingValue={rating} onChange={(e) => setRating(e.target.value)} /* Available Props */ />
    </div>
        </div>
        <div className="shareTop">
        <label className="sidebarListItemText">Review</label>
          
          <textarea
            placeholder={"What's in your mind Let us know your review " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
       
          
          <button className="shareButton" type="submit" onClick={submitHandler}>
            Share
          </button>
      
      </div>
    </div>
  );
}
