import React ,{ isValidElement, useState} from "react"

import {useForm} from "../../shared/hooks/form-hook"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import {VALIDATOR_EMAIL , VALIDATOR_MINLENGTH} from "../../shared/util/validators"
import Card from "../../shared/components/UIElements/Card"

import "./Auth.css"


const Auth = () => {
    const initialInput = {
        email : {
            value  : "",
            isValid :  false
        },
        password : {
            value :  "",
            isValid :  false
        }
    }
    
    const [formState,inputHandler] = useForm(initialInput,false);
    
    
    const authFormSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return(
        <Card className="authentication">
            <h2>Login Required!</h2>
            <hr/>
            <form onClick={authFormSubmitHandler}>
                <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators = {[VALIDATOR_MINLENGTH]}
                errorText = "Please enter a valid email!!"
                onInput = {inputHandler}
                />


                <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators = {[VALIDATOR_MINLENGTH(5)]}
                errorText = "Please enter a valid password"
                onInput = {inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
            </form>
        </Card>
    )
}

export default Auth;