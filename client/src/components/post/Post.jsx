import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Rating } from 'react-simple-star-rating'
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Grid
} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Post({ post }) {
  const { user } = useContext(AuthContext);

 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [openreview, setOpenreview] = useState(false);
  const [rating, setRating] = useState(0) // initial rating value
  const [title,setTitle] = useState('');
  const [review,setReview] = useState('');
  const [streamApp,setStreamApp] = useState('');
  const [formData, setFormData] = useState({});
  const setFormProp = function (e) {
    const oldFormData = formData;
    oldFormData[e.target.name] = e.target.value;

    setFormData(oldFormData);
  }
  
  // const fetchUser = async () => {
    
  //   const res = await axios.get(`/users?userId=${post.userId}`);
  //   setUser(res.data);
  // };

  // useEffect(() => {
    
  //   fetchUser();
  // }, [post.userId]);

  const deleteHandler = async (id) =>{
 

    
    try {
     
      const res = await axios.delete("/posts/"+id,{
        headers :{
          'token':`Bearer ${user.accessToken}`
        },
      });
      console.log(res);
 
      window.location.reload();
    } catch (err) {}
  }

  const submitHandler = async (id) => {

 
    
    try {
      handleCancel();
      console.log("Inside Submit handler")

      const data = formData
      if(rating !== 0){
        data["rating"]=rating;
      }
    
      await axios.put("/posts/"+id,data,{
        headers :{
          'token':`Bearer ${user.accessToken}`
        },
      })
        
      window.location.reload();
      
    } catch (err) {}
  };

  const handleCancel = () => {

    setOpenreview(false);

  };
  const handleRating = (rate: number) => {
    setRating(rate)
    // other logic
  }

  
  return (
    <>
    <Dialog
        open={openreview}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        fullWidth
        maxWidth="md"
        aria-describedby="alert-dialog-description"
        style={{borderRadius:"10px"}}

      >
        <DialogTitle id="alert-dialog-title">Update Details</DialogTitle>
        <DialogContent>
        <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <label>Title</label>
          
          <input
            placeholder={" What was the title of show you watched " + user.username + "?"}
            className="shareInput"
            onChange={setFormProp}
            name = "title"
            defaultValue = {post?.title}
          />
        </div>
        <div className="shareTop">
        <label>Streaming App</label>
          
          <input
            placeholder={"Which streaming platform you have used  " + user.username + "?"}
            className="shareInput"
            onChange={setFormProp}
            name = "streamApp"
            defaultValue = {post?.streamApp}
          />
        </div>
        <div className="shareTop">
        <label>Rating</label>
          
        <div className='App'>
      <Rating  onClick={handleRating} ratingValue={post?.rating} onChange={(e) => setRating(e.target.value)} /* Available Props */ />
    </div>
        </div>
        <div className="shareTop">
        <label className="sidebarListItemText">Review</label>
          
          <textarea
            placeholder={"What's in your mind Let us know your review " + user.username + "?"}
            className="shareInput"
            defaultValue={post?.review}
            name = "review"
            onChange={setFormProp}
            
          />
        </div>
    
       
       
      
      </div>
    </div>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleCancel}>
            Close
          </Button>

          <Button
            color="success"
            onClick={()=>{submitHandler(post?._id)}}
            
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText" style={{fontWeight: "500"}}>{post?.title}</span>
          

          <div className="contain">
            <span className="postText">Streaming App</span>
            <div>
            <span className="postText1">{post?.streamApp}</span>

            </div>
            

          </div>
          <div className="contain">
            <span className="postText">Review</span>
            <div>
              <p className="postText1">{post?.review}</p>

            </div>
            

          </div>
         
          <div className='App'>
      <Rating   ratingValue={post?.rating} readonly={true} size={25}/* Available Props */ />
    </div>
        
          
         
        </div>
        <div className="postBottom">
          
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
         
          <div className="postBottomRight">
          <span className="postCommentText" style={{color:"#1877f2",marginRight:"10px"}} onClick={()=>{
            setOpenreview(true);

          }}> edit</span>
            <span className="postCommentText" style={{color:"red"}} onClick={()=>{
              deleteHandler(post?._id)}}> delete</span>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}
