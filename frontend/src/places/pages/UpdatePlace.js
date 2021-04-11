import React, { useEffect, useState,useContext } from "react";

import { useParams ,useHistory} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {AuthContext} from "../../shared/context/auth-context"

import "./UpdatePlace.css";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [identifiedPlace, setIdentifiedPlace] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/${placeId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIdentifiedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendReq();
  }, [setFormData, placeId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && !identifiedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Cannot Find Place!</h2>
        </Card>
      </div>
    );
  }
  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/places/${placeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      history.push("/" + auth.userId + '/places');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message || "Something Went Wrong");
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && identifiedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Text"
            onInput={inputHandler}
            initialValue={identifiedPlace.title}
            initialisValid={true}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter Valid Description"
            onInput={inputHandler}
            initialValue={identifiedPlace.description}
            initialisValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
