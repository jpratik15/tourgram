import React, { isValidElement, useState, useContext } from "react";
import {useHistory} from 'react-router-dom'
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload"

import "./Auth.css";

const Auth = () => {
  const history = useHistory();
  const initialInput = {
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler, setFormData] = useForm(initialInput, false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image : undefined

        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image : {
            value : null,
            isValid : false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authFormSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login(responseData.userId,responseData.token);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(err.message || "Something Went Wrong");
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("name",formState.inputs.name.value);
        formData.append("email",formState.inputs.email.value);
        formData.append("password",formState.inputs.password.value);
        formData.append("image",formState.inputs.image.value);

        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          body : formData
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login(responseData.userId,responseData.token);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(err.message || "Something Went Wrong");
      }
    }
  };
  const errorHandler = () => {
    setIsError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required!</h2>
        <hr />
        <form onSubmit={authFormSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name"
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email!!"
            onInput={inputHandler}
          />
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please select an image"/>}

          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password of length atleast 6"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button type="submit" onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
