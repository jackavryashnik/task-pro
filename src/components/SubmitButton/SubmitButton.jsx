import css from "./SubmitButton.module.css"

export const SubmitButton = ({ children }) => {
  return <button className={css.button} type="submit">{children}</button>
}