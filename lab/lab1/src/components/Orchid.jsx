import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Orchid({ id, orchidName, description, image, onDetail }) {
  return (
    <Card className="shadow-sm h-100 text-center">
      <Card.Img
        variant="top"
        src={image}
        alt={orchidName}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <small className="text-muted">ID: {id}</small>

        <Card.Title className="mt-1">{orchidName}</Card.Title>

        <Card.Text className="text-muted small mb-3">
          {description.length > 60
            ? description.substring(0, 60) + "..."
            : description}
        </Card.Text>

        <Button
          variant="primary"
          className="mt-auto"
          onClick={onDetail}   // ✅ callback
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
