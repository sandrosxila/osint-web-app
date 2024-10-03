import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={classNames(styles.button, className)} {...props} />;
};
