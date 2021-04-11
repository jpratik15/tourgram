import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserItem from "../../users/components/UserItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../../places/components/PlaceList";

const UserPlaces = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/user/${userId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPlaces(responseData.places);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendReq();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const deleteHandler = (placeId) =>{
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <div className="center"><LoadingSpinner /></div>}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete = {deleteHandler}/>}
    </React.Fragment>
  );
};
export default UserPlaces;
