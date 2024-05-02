import { Link } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>We&apos;re sorry, the page you requested could not be found.</p>
      <p>
        Please go back to the <Link to="/">homepage</Link> or contact us if the
        problem persists.
      </p>
    </div>
  );
};

export default NotFound;
