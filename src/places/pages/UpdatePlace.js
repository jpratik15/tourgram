import React from "react";

import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH } from "../../shared/util/validators";

const DUMMY_PLACE = [
  {
    id: "p1",
    title: "Empire State",
    description: "One of 7 wonders",
    imageURL:
      "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
    address: "Agra",
    location: [78.042068, 27.173891],
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State",
    description: "One of 7 wonders",
    imageURL:
      "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
    address: "Agra",
    location: [78.042068, 27.173891],
    // location :[-74.5, 40],
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACE.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Cannot Find Place!</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText = "Please Enter Valid Text"
        onInput = {()=> {}}
        value = {identifiedPlace.title}
        valid = {true}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText = "Please Enter Valid Description"
        onInput = {()=> {}}
        value = {identifiedPlace.description}
        valid = {true}
      />
      <Button type="submit" disable={true}>UPDATE PLACE</Button>
    </form>
  );
};

export default UpdatePlace;
