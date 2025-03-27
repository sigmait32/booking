import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
    const { userInfo } = useSelector((state) => state.auth);
  console.log("user 404 page is ====>",userInfo)

  return (
    <Container className="text-center d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="text-dark">Oops! Page Not Found</h2>
      <p className="lead text-muted">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to={userInfo ? "/dashboard" : "/login"}>
        <Button variant="primary">{userInfo ? "Go to Dashboard" : "Go to Login"}</Button>
      </Link>
    </Container>
  );
};

export default NotFound;

