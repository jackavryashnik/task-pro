import css from "./Button.module.css"
import clsx from "clsx";

export const Button = ({ className, type, children, ...props }) => {
  return <button className={clsx(css.button, className)} type={type} {...props}>{children}</button>
}