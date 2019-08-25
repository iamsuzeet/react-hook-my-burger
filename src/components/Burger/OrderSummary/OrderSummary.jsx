import React, { Component } from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // this could be a functional component
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("orderSummary did update");
  // }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchasedContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
