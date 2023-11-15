import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { getGames } from "../logic/GameService";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getLocations } from "../logic/LocationService";
import { GameResponse } from "../viewModels/GameViewModel";
import { LocationResponse } from "../viewModels/LocationViewModel";
import { useNavigate } from 'react-router-dom';
import "./CreateEventPage.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface CreateEventPageProps {}

const CreateEventPage: React.FC<CreateEventPageProps> = () => {
  const [eventName, setEventName] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [costPerPerson, setCostPerPerson] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDescription, setEventDescription] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const [gamesList, setGamesList] = useState<GameResponse[]>([]);
  const [locationsList, setLocationsList] = useState<LocationResponse[]>([]);
  const navigate = useNavigate();
  const redirectToRoot = () => {
    return navigate('/');
  };

  useEffect(() => {
    // Fetch games list from GameService
    async function fetchGames() {
      try {
        const games = await getGames();
        setGamesList(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    // Fetch locations list from LocationService
    async function fetchLocations() {
      try {
        const locations = await getLocations();
        setLocationsList(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    fetchGames();
    fetchLocations();
  }, []);

  const handleEventCreation = () => {
    console.log("Event created with the following data:", {
      eventName,
      selectedGame,
      costPerPerson,
      selectedLocation,
      selectedDate,
      eventDescription,
      avatar,
    });
    navigate("/start-payment")
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="create-event-page">
      <div className="header">
        <div className="stripe">
          <h2 className="purple-text">Create Event</h2>
        </div>
      </div>
      <div className="form">
        {/* Column 1 */}
        <div className="column">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            {gamesList.map((game) => (
              <option key={game.gameId} value={game.gameName}>
                {game.gameName}
              </option>
            ))}
          </select>
          <div className="input-with-suffix">
            <input
              type="number"
              placeholder="Cost per person"
              value={costPerPerson !== undefined ? costPerPerson : ''}
              onChange={(e) => setCostPerPerson(parseFloat(e.target.value))}
            />
            <span>PLN</span>
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locationsList.map((location) => (
              <option key={location.locationId} value={location.locationName}>
                {location.locationName}
              </option>
            ))}
          </select>
        </div>

        <div className="column">
        <DatePicker
          onChange={(date: Date | null) => setSelectedDate(date)}
          label="Select Date"
        />

        </div>

        {/* Column 3 */}
        <div className="column">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatar(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Column 4 */}
        <div className="column">
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="bottom-buttons">
        <button className="cancel-button" onClick={redirectToRoot}>Cancel</button>
        <button className="create-button" onClick={handleEventCreation}>
          Create
        </button>
      </div>
    </div>
    </LocalizationProvider>
  );
};

export default CreateEventPage;
