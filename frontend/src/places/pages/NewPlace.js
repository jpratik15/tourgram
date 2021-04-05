import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./NewPlace.css";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
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

  const [formState,inputHandler] = useForm(initialInput,initialValidity);


  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};
export default NewPlace;
