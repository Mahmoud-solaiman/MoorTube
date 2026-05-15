import './Spinner.scss';

export default function Spinner() {
  return (
    <div className="spinner-container" aria-hidden="true">
      <div className="spinner-outer" aria-hidden="true">
        <div className="spinner-inner" aria-hidden="true"></div>
      </div>
    </div>
  );
}