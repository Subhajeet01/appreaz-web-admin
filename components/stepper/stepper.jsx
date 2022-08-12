import React from "react";

export default function Stepper({ children, activeStep }) {
  return <div>{children[activeStep]}</div>;
}
