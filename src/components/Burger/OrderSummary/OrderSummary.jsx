import React from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  // this could be a functional component
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("orderSummary did update");
  // }

  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchasedContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
