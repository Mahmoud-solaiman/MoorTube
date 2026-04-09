import './ErrorMessage.scss'; // The style sheet of this component

export function ErrorMessage({ errorMessage }: {errorMessage: string}) {
  //Variables and states
  const errorMessageClassNames = (errorMessage === 'Added successfully!' || errorMessage === 'Back online') ? 'error-message success' : 'error-message'; // Check if the message is a positive or a negative message to assign the proper color to it
  
  // The JSX of the ErrorMessage component
  return (
    <div className="error-message-container">
      <div className={errorMessageClassNames}>
        {errorMessage}
      </div>
    </div>
  );
}