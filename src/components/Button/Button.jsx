export const Button = ({
    text,
    type,
    disabled
}) => {
    return ( <button type={type} disabled={disabled || false}> {
            text
        } </button>
    )
}