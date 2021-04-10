import React, { useState,useContext } from "react";
import {useHistory} from 'react-router-dom';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {AuthContext} from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./NewPlace.css";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  
  const auth = useContext(AuthContext);
  const initialInput = {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    address: {
      value: "",
      isValid: false,
    },
  };
  const initialValidity = false;
  
  const [formState, inputHandler] = useForm(initialInput, initialValidity);
  
  const history = useHistory()
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(auth);
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      history.push('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsError(err.message || "Something Went Wrong");
    }
  };

  const errorHandler = () => {
    setIsError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler}/>
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay/>}
        <Input
          id="title"
          element="input"
          type="text"
          label="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter A Valid Title"
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter Atleast 5 Characters"
          onInput={inputHandler}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};
export default NewPlace;
