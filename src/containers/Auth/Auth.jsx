import React, { useState, useEffect } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const [isSignup, setSignup] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMsg = null;

  if (props.error) {
    errorMsg = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMsg}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? "Register" : "Sign In"}</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch to {isSignup ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
