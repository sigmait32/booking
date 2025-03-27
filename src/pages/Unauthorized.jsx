import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg text-center p-5 border-danger" style={{ maxWidth: "500px" }}>
        <i className="fa fa-lock fa-3x text-danger mb-3"></i>
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">You do not have permission to view this page.</p>
        <Link to="/dashboard">
          <Button variant="primary" className="mt-3">
            <i className="fa fa-home me-2"></i> Go to Dashboard
          </Button>
        </Link>
      </Card>
    </Container>
  );
};

export default Unauthorized;

