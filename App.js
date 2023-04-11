
//this has 4 templates for hotels when the user login,
//also login/signout working
//functional with add, delete, edit


import { useState } from 'react';
import './App.css';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [hotels, setHotels] = useState([]);

const handleLogin = () => {
setIsLoggedIn(true);
};

const handleLogout = () => {
setIsLoggedIn(false);
};

const handleAddHotel = (hotel) => {
setHotels([...hotels, hotel]);
};

const handleUpdateHotel = (index, hotel) => {
const updatedHotels = [...hotels];
updatedHotels[index] = hotel;
setHotels(updatedHotels);
};

const handleDeleteHotel = (index) => {
const updatedHotels = [...hotels];
updatedHotels.splice(index, 1);
setHotels(updatedHotels);
};

return (
<div>
<header>
<nav>
<ul>
<li><a href="#">Hotels</a></li>
<li><a href="#">Flights</a></li>
<li><a href="#">Activities</a></li>
<li><a href="#">Cars</a></li>
</ul>
{isLoggedIn ? (
<button onClick={handleLogout}>Logout</button>
) : (
<div>
<button onClick={handleLogin}>Login</button>
<button>Sign Up</button>
</div>
)}
</nav>
<div className="search-container">
<h1>Find Your Next Destination</h1>
<form action="#" method="get">
<input type="text" name="destination" placeholder="Enter your destination" />
<button type="submit">Search</button>
</form>
</div>
</header>
<main>
{isLoggedIn && (
<div>
<form onSubmit={(e) => {
e.preventDefault();
handleAddHotel({
name: e.target.elements.name.value,
image: e.target.elements.image.value,
description: e.target.elements.description.value,
price: e.target.elements.price.value
});
e.target.reset();
}}>
<input type="text" name="name" placeholder="Enter hotel name" />
<input type="text" name="image" placeholder="Enter hotel image URL" />
<textarea name="description" placeholder="Enter hotel description"></textarea>
<input type="number" name="price" placeholder="Enter hotel price" />
<button type="submit">Add Hotel</button>
</form>
{hotels.map((hotel, index) => (
<div key={index}>
<img src={hotel.image} alt={hotel.name} />
<h2>{hotel.name}</h2>
<p>{hotel.description}</p>
<p>Price: {hotel.price}</p>
<button onClick={() => handleUpdateHotel(index, { ...hotel, name: 'updated hotel' })}>Update</button>
<button onClick={() => handleDeleteHotel(index)}>Delete</button>
</div>
))}
</div>
)}
<div className="image-container">
<img src="https://picsum.photos/325/350?random=1" alt="random image" />
<img src="https://picsum.photos/325/350?random=2" alt="random image" />
          <img src="https://picsum.photos/325/350?random=3" alt="random image" />
          <img src="https://picsum.photos/325/350?random=4" alt="random image" />
        </div>
      </main>
      <footer>
        <p>&copy; 2023 My Travel App</p>
      </footer>
    </div>
  );
}

export default App;
