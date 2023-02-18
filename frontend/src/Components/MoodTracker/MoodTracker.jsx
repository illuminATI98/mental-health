import React, { useState } from 'react'
import "./MoodTracker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmojiAngry from '../Emojis/EmojiAngry/EmojiAngry';
import EmojiFrown from '../Emojis/EmojiFrown/EmojiFrown';
import EmojiNeutral from '../Emojis/EmojiNeutral/EmojiNeutral';
import EmojiSmile from '../Emojis/EmojiSmile/EmojiSmile';
import EmojiLaughing from '../Emojis/EmojiLaughing/EmojiLaughing';

const MoodTracker = (props) => {

  let loader = document.querySelector('.loadingContainer');

  const [rating, setRating] = useState(0);
  //const [isEditing, setIsEditing] = useState(false);
  const [rated, setRated] = useState(false);

  // function handleRatingChange(event) {
  //   setRating(parseInt(props.value));
  //   console.log((event.target.props.value));
  // }

  function getChildProps(value) {
    setRating(value);
    console.log(value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    loader.style.visibility = 'visible';
    let response = await fetch("https://localhost:7270/mood", {
      body: JSON.stringify({ "description": rating }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    let result = await response.json();
    if (response.ok) {
      console.log(result);
      setRated(true);
    }
    else {
      console.error('Error')
    }
    loader.style.visibility = 'hidden';
  }

  // function handleEdit(event) {
  //   event.preventDefault();
  //   if (isEditing) {
  //     setIsEditing(false);
  //   } else setIsEditing(true);
  // }
  return (
    <>
      {/* {isEditing ? (<>
          <form onSubmit={handleSubmit}>
          <input type="radio" name="rating" value="0" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="1" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="2" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 
            <input type="radio" name="rating" value="4" onChange={handleRatingChange} />
            </form>
            
            <button type="submit" onClick={handleEdit}>Submit</button>
            </>
            ) : (<>
          <form>
            <input type="radio" disabled="disabled" name="rating" value="1" onChange={handleRatingChange} />
            <input type="radio" disabled="disabled" name="rating" value="2" onChange={handleRatingChange} /> 
            <input type="radio" disabled="disabled" name="rating" value="3" onChange={handleRatingChange} />
            <input type="radio" disabled="disabled" name="rating" value="4" onChange={handleRatingChange} /> 
            <input type="radio" disabled="disabled" name="rating" value="5" onChange={handleRatingChange} />
            </form>
            
            <button onClick={handleEdit}>Edit</button>
          </>)} */}
      {rated === false && (
        <div className='mood-container'>
          <h3 className="ratingHeader">How are you feeling today?</h3>
          <div className='loadingContainer'>
            <span className="loader"></span>
          </div>
          <form className='ratingForm' onSubmit={(event) => handleSubmit(event)}>
            <div className='inputs'>
              <div className='inputWrapper'>
                <div id="angry-emoji-wrapper" className='emoji-wrapper angry'>
                  <EmojiAngry passedProp={getChildProps} value={0} />
                </div>
                <label className='inpLabel' htmlFor="0">Very Bad</label>
              </div>
              <div className='inputWrapper'>
                <div id="frown-emoji-wrapper" className='emoji-wrapper frown'>
                  <EmojiFrown passedProp={getChildProps} value={1} />
                </div>
                <label className='inpLabel' htmlFor="1">Bad</label>
              </div>
              <div className='inputWrapper'>
                <div id='neutral-emoji-wrapper' className='emoji-wrapper neutral'>
                  <EmojiNeutral passedProp={getChildProps} value={2} />
                </div>
                <label className='inpLabel' htmlFor="2">Average</label>
              </div>
              <div className='inputWrapper'>
                <div id='smile-emoji-wrapper' className='emoji-wrapper smile'>
                  <EmojiSmile passedProp={getChildProps} value={3} />
                </div>
                <label className='inpLabel' htmlFor="3">Good</label>
              </div>
              <div className='inputWrapper'>
                <div id='laughing-emoji-wrapper' className='emoji-wrapper laugh'>
                  <EmojiLaughing passedProp={getChildProps} value={4} />
                </div>
                <label className='inpLabel' htmlFor="4">Very Good</label>
              </div>
            </div>
            <button className='btn btn-success' type="submit">Submit</button>
          </form>
        </div>
      )}
      {rated && (
        <div className='mood-container'>
          <p>Thank you for submitting your rating!</p>
        </div>
      )}
    </>
  );
}

export default MoodTracker