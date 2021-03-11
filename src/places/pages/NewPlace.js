import React, { useCallback , useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import "./NewPlace.css";


const formReducer = (state,action) => {
  switch(action.type){
    case "INPUT_CHANGE" :
      let formIsValid = true;

      for(const inputId in state.input){
        if(inputId ===action.inputId){
          formIsValid = formIsValid && action.isValid
        }else {
          formIsValid = formIsValid && state.input[inputId].isValid;
        }
      }

      return {
        ...state,
        input : {
          ...state.input,
          [action.inputId] : {value : action.value, isValid : action.isValid}
        },
        isValid : formIsValid
      }
    default:
      return state;

  }
}

const NewPlace = () => {
  const [formState,dispatch] = useReducer(formReducer,{
    input : {
      title : {
        value:"",
        isValid:false
      },
      description : {
        value:"",
        isValid:false
      }
    },
    isValid : false
  })
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type:"INPUT_CHANGE" , inputId : id ,value : value , isValid : isValid})
  },[]);

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter A Valid Title"
        onInput = {inputHandler}
        />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter Atleast 5 Characters"
        onInput = {inputHandler}
      />
      {console.log(formState)}
      <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
    </form>
  );
};
export default NewPlace;
