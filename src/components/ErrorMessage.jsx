import './ErrorMessage.scss'; // The style sheet of this component

export function ErrorMessage({ errorMessage }) {
  //Variables and states
  const errorMessageColor = (errorMessage === 'Added successfully!' || errorMessage === 'Back online') ? '#198754' : '#ce0c09'; // Check if the message is a positive or a negative message to assign the proper color to it
  
  // The JSX of the ErrorMessage component
  return (
    <div className="error-message-container">
      <div className="error-message" style={{backgroundColor: errorMessageColor}}>
        {errorMessage}
      </div>
    </div>
  );
}