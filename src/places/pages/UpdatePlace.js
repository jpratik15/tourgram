import React ,{ useEffect , useState}from "react";

import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hook"

import "./UpdatePlace.css"
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
  const [isLoading,setIsLoading] = useState(true);
  
  const [formState,inputHandler,setFormData] = useForm({
    title : {
      value : "", 
      isValid : false
    },
    description : {
      value :  "", 
      isValid : false 
    } 
  },false)
  
  const identifiedPlace = DUMMY_PLACE.find((p) => p.id === placeId);

  useEffect(()=> {
    setFormData({
      title : {
        value : identifiedPlace.title, 
        isValid : true
      },
      description : {
        value :  identifiedPlace.description, 
        isValid : true 
      } 
    },true);
    setIsLoading(false);
  },[setFormData,identifiedPlace])

  
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Cannot Find Place!</h2>
      </div>
    );
  }
  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if(isLoading){
    return <div className="center">
        <h2>Loading....</h2>
      </div>
  }
  

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText = "Please Enter Valid Text"
        onInput = {inputHandler}
        initialValue = {formState.inputs.title.value}
        initialisValid = {formState.inputs.title.isValid}
        />
        
        <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText = "Please Enter Valid Description"
        onInput = {inputHandler}
        initialValue = {formState.inputs.description.value}
        initialisValid = {formState.inputs.description.isValid}
        />
      <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
  );
};

export default UpdatePlace;
