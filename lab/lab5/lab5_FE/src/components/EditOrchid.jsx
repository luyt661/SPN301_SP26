import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import {
  getOrchidById,
  updateOrchid,
  getAllCategories
} from '../api/orchidApi';

export default function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resOrchid, resCat] = await Promise.all([
          getOrchidById(id),
          getAllCategories()
        ]);

        setCategories(resCat.data);
        reset({
          ...resOrchid.data,
          categoryId: resOrchid.data.category?.categoryId
        });
      } catch {
        toast.error('Lỗi tải dữ liệu!');
      }
    };

    fetchData();
  }, [id, reset]);

  const onUpdate = async (data) => {
    const payload = {
      ...data,
      category: {
        categoryId: Number(data.categoryId)
      }
    };

    try {
      await updateOrchid(id, payload);
      toast.success('Cập nhật thành công!');
      setTimeout(() => navigate('/'), 1200);
    } catch {
      toast.error('Cập nhật thất bại!');
    }
  };

  return (
    <Container className="py-5">
      <Toaster />

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-warning fw-bold">
          Edit Orchid Information
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onUpdate)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
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
                rows={4}
                {...register('orchidDescription')}
              />
            </Form.Group>

            <div className="d-flex gap-5 p-3 bg-light rounded mb-4">
              <Form.Check
                type="switch"
                label="Natural Source"
                {...register('isNatural')}
              />
              <Form.Check
                type="switch"
                label="Attractive"
                {...register('isAttractive')}
              />
            </div>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success">
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
