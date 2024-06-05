import css from "./FormErrorMessages.module.css"

export const FormErrorMessages = ({ children }) => {
    return <p className={css.description}>{children}</p>
}