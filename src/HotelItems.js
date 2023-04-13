import React, { useState } from 'react';
import Card from './Card';

function HotelItems(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [hotelName, setHotelName] = useState(props.name);
  const [hotelImage, setHotelImage] = useState(props.image);
  const [hotelRatings, setHotelRatings] = useState(props.ratings);
  const [hotelPrice, setHotelPrice] = useState(props.price);
  
  const handleEditClick = () => {
  setIsEditing(true);
  };
  
  const handleSaveClick = () => {
  setIsEditing(false);
  props.onSave({
  name: hotelName,
  image: hotelImage,
  ratings: hotelRatings,
  price: hotelPrice,
  });
  };
  
  const handleCancelClick = () => {
  setIsEditing(false);
  setHotelName(props.name);
  setHotelImage(props.image);
  setHotelRatings(props.ratings);
  setHotelPrice(props.price);
  };
  
  const handleNameChange = (event) => {
  setHotelName(event.target.value);
  };
  
  const handleImageChange = (event) => {
  setHotelImage(event.target.value);
  };
  
  const handleRatingsChange = (event) => {
  setHotelRatings(event.target.value);
  };
  
  const handlePriceChange = (event) => {
  setHotelPrice(event.target.value);
  };
  
  return (
  <div>
  {isEditing ? (
  <div>
  <input type="text" value={hotelName} onChange={handleNameChange} />
  <input type="text" value={hotelImage} onChange={handleImageChange} />
  <input type="text" value={hotelRatings} onChange={handleRatingsChange} />
  <input type="text" value={hotelPrice} onChange={handlePriceChange} />
  <button onClick={handleSaveClick}>Save</button>
  <button onClick={handleCancelClick}>Cancel</button>
  </div>
  ) : (
  <div>
  <Card>
  <img src={hotelImage} alt={hotelName} />
  <h2>{hotelName}</h2>
  <p>Ratings: {hotelRatings}</p>
  <p>Price: {hotelPrice}</p>
  <button onClick={handleEditClick}>Edit</button>
  </Card>
  </div>
  )}
  </div>
  );
  }
  
  export default HotelItems;