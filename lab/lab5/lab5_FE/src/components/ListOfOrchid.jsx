import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  getAllOrchids,
  deleteOrchid,
  createOrchid,
  getAllCategories
} from '../api/orchidApi';

export default function ListOfOrchid() {
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const loadData = async () => {
    try {
      const [resOrchid, resCat] = await Promise.all([
        getAllOrchids(),
        getAllCategories()
      ]);

      setOrchids(resOrchid.data.sort((a, b) => b.orchidId - a.orchidId));
      setCategories(resCat.data);
    } catch {
      toast.error('Lỗi kết nối Backend!');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      category: {
        categoryId: Number(data.categoryId)
      }
    };

    try {
      await createOrchid(payload);
      toast.success('Thêm thành công!');
      setShowAdd(false);
      reset();
      loadData();
    } catch {
      toast.error('Thêm thất bại!');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOrchid(deleteId);
      toast.success('Đã xóa hoa lan!');
      setShowConfirm(false);
      loadData();
    } catch {
      toast.error('Xóa thất bại!');
    }
  };

  return (
    <Container className="py-4">
      <Toaster />

      <div className="d-flex justify-content-between mb-4">
        <h3 className="text-primary fw-bold">
          Orchid Management (Category Mapping)
        </h3>
        <Button onClick={() => setShowAdd(true)}>+ Add Orchid</Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th width="150">Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {orchids.map((o) => (
            <tr key={o.orchidId}>
              <td>
                <img
                  src={o.orchidUrl}
                  alt="orchid"
                  width={50}
                  height={50}
                  className="rounded"
                  style={{ objectFit: 'cover' }}
                />
              </td>
              <td className="fw-bold">{o.name}</td>
              <td>
                <Badge bg="info">
                  {o.category?.categoryName || 'N/A'}
                </Badge>
              </td>
              <td>
                <div className="text-truncate" style={{ maxWidth: 150 }}>
                  {o.orchidDescription}
                </div>
              </td>
              <td>
                {o.isNatural ? (
                  <Badge bg="success">Natural</Badge>
                ) : (
                  <Badge bg="warning">Industry</Badge>
                )}
              </td>
              <td>
                <Link
                  to={`/edit/${o.orchidId}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setDeleteId(o.orchidId);
                    setShowConfirm(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ADD MODAL */}
      <Modal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        size="lg"
        backdrop="static"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>New Orchid Entry</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Orchid Name</Form.Label>
                  <Form.Control
                    {...register('name', { required: true })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    {...register('categoryId', { required: true })}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((c) => (
                      <option key={c.categoryId} value={c.categoryId}>
                        {c.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                {...register('orchidUrl', { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('orchidDescription')}
              />
            </Form.Group>

            <div className="d-flex gap-4">
              <Form.Check
                type="switch"
                label="Natural"
                {...register('isNatural')}
              />
              <Form.Check
                type="switch"
                label="Attractive"
                {...register('isAttractive')}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* DELETE CONFIRM */}
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        size="sm"
      >
        <Modal.Body className="text-center p-4">
          <h5>Are you sure?</h5>
          <div className="mt-4">
            <Button
              variant="danger"
              className="me-2 px-3"
              onClick={handleConfirmDelete}
            >
              OK
            </Button>
            <Button
              variant="secondary"
              className="px-3"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
