import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function Orchid({ id, orchidName, description, category, isSpecial, price, image }) {
  return (
    <Card className="shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        alt={orchidName}
      />

      <Card.Body>
        <Card.Title className="d-flex flex-column gap-1">

          <small className="text-muted">
            ID: {id}
          </small>

          <span className="fw-bold fs-5">
            {orchidName}
          </span>

          <span className="text-muted">
            Special:{" "}
            {isSpecial ? (
              <Badge bg="success">True</Badge>
            ) : (
              <Badge bg="secondary">False</Badge>
            )}
          </span>

          <span className="text-danger fw-semibold">
            Price: {price.toLocaleString()} VND
          </span>

        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          Category: {category}
        </Card.Subtitle>

        <Card.Text style={{ textAlign: "justify" }}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
