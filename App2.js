// this code works when user login's the 4 random picture will be changed into hotels
//when you click on the images it will appear as one big card on the page,
//with hardcoded add, delete, update button implemented.


import { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSelectHotel = (index) => {
    setSelectedHotel(index);
  };

  const renderHotelDetails = () => {
    if (selectedHotel !== null) {
      return (
        <div>
          <img src={`https://picsum.photos/325/350?random=${selectedHotel + 1}`} alt="selected hotel" />
          <h2>Hotel {selectedHotel + 1}</h2>
          <p>Description of Hotel {selectedHotel + 1}</p>
          {isLoggedIn && (
            <div>
              <button>Add</button>
              <button>Update</button>
              <button>Delete</button>
            </div>
          )}
        </div>
      );
    }
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
            <h2>Your Bookings</h2>
            <ul>
              <li>Booking 1</li>
              <li>Booking 2</li>
              <li>Booking 3</li>
            </ul>
          </div>
        )}
        {selectedHotel === null && (
          <div className="image-container">
            <img src="https://picsum.photos/325/350?random=1" alt="random image" onClick={() => handleSelectHotel(0)} />
            <img src="https://picsum.photos/325/350?random=2" alt="random image" onClick={() => handleSelectHotel(1)} />
            <img src="https://picsum.photos/325/350?random=3" alt="random image" onClick={() => handleSelectHotel(2)} />
            <img src="https://picsum.photos/325/350?random=4" alt="random image" onClick={() => handleSelectHotel(3)} />
          </div>
        )}
        {renderHotelDetails()}
      </main>
      <footer>
        <p>&copy; 2023 My Travel App</p>
      </footer>
    </div>
  );
}

export default App;
