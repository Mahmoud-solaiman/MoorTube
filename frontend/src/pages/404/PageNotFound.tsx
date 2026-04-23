import { Link } from 'react-router-dom'; // Import the Link component from the react-router-dom package
import './PageNotFound.scss'; // Import the style sheet of this component

// The JSX of the PageNotFound component
export function PageNotFound() {
  return (
    <div className='page-not-found'>
      <div className='status-code'>4<span className='zero-status-code'>0</span>4</div>
      <div className="not-found-page-message-title">Oops! This Page Could Not Be Found</div>
      <p className="not-found-page-message">
        Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable
      </p>
      <Link to="/" className="home-page-btn">GO TO HOMEPAGE</Link>
    </div>
  );
}