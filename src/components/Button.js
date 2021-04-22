import React from "react";
import classNames from "classnames/bind";

import "styles/Button.scss";

// export default function Button(props) {
//    return <></>;
// }

// export default function Button(props) {
//    return <button>{props.children}</button>;
//  }

// let buttonClass = "button";

// if (props.confirm) {
//   buttonClass += " button--confirm";
// }

// if (props.danger) {
//   buttonClass += " button--danger";
// }

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
