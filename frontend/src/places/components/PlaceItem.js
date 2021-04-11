import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  let [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const confirmDeleteHandler = async () => {
    setDeleteModal(false);
    try {
      setIsLoading(true);
      await fetch(`http://localhost:5000/api/places/${props.id}`,{
        method: "DELETE"
      })
      setIsLoading(false);
      props.onDelete(props.id);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

  };

  const errorHandler =  () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error = {error} onClear = {errorHandler}/>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={deleteModal}
        onCancel={hideDeleteModal}
        header="Are you Sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={hideDeleteModal}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>This action cannot be reversed!</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteModal}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
