import React from 'react'
import classNames from 'classnames'
import styles from './close-button.module.scss'
import CloseIcon from "@/assets/icons/close.svg?react";

type CloseButtonProps = {color?: string, size?: number} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">

export const CloseButton = ({className, color, size = 24, ...props} : CloseButtonProps) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      <CloseIcon color={color} width={size} height={size}/>
    </button>
  )
}
