import React from "react";
import classNames from "classnames";

import styles from "./input.module.scss";

type InputProps = React.PropsWithChildren &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
  return <input className={classNames(styles.input, className)} {...props} />;
};
