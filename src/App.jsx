import axios from 'axios';
import React from 'react';
import { Button, Dropdown, DropdownButton, Offcanvas } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setName, addSchema, removeSchema, resetForm, setLoader } from './redux/slice';

const Test = () => {
  const dispatch = useDispatch();
  const { name, schemas, availableSchemas, loader } = useSelector((state) => state.item);
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    dispatch(resetForm());
    setShow(false);
  };

  const handleShow = () => {
    dispatch(resetForm());
    setShow(true);
  };

  const handleAddSchema = (schemaValue) => {
    const schema = availableSchemas.find(s => s.value === schemaValue);
    if (schema) {
      dispatch(addSchema(schema.value));
    }
  };

  const handleRemoveSchema = (index) => {
    dispatch(removeSchema(index));
  };

  const handleSaveCategory = async (event) => {
    event.preventDefault();
    if (!name) {
      alert('Please enter a name for the category.');
      return;
    }

    if (schemas.length === 0) {
      alert('Please select at least one schema to save category.');
      return;
    } 

    const categoryData = {
      category_name: name,
      schema: schemas.map(schema => ({ [schema.value]: schema.label }))
    };

    try {
      dispatch(setLoader(true));
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', categoryData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(setLoader(false));
      console.log('API call successful:', response.data);
      alert('Category saved successfully!');
      handleClose();
    } catch (error) {
      console.error('Error calling API:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  return (
    <>
      {loader && <div className='loader'>Loading......</div>}
      {!loader && <button className="btn btn-outline-success" onClick={handleShow}>
        Save category
      </button>}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saving Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Control
                type="text"
                placeholder="Name of the category"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                className='shadow-none border-dark'
                required
              />
            </Form.Group>
            <div className="my-3">
              <div className="border mb-3 p-3">
                {schemas.length > 0 ? schemas.map((schema, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col">
                      <Form.Control readOnly value={schema.label} />
                    </div>
                    <div className="col-auto">
                      <Button variant="outline-danger" onClick={() => handleRemoveSchema(index)}>-</Button>
                    </div>
                  </div>
                )) : <p className='text-center mb-0'>No schema is there</p>}
              </div>
              <div className="row">
                <div className="col">
                  <DropdownButton
                    title="Add schema to category"
                    onSelect={handleAddSchema}
                  >
                    {availableSchemas.length > 0 ? availableSchemas.map(schema => (
                      <Dropdown.Item key={schema.value} eventKey={schema.value}>
                        {schema.label}
                      </Dropdown.Item>
                    ))
                      :
                      <Dropdown.Item disabled>
                        No Schema available
                      </Dropdown.Item>
                    }
                  </DropdownButton>
                </div>
              </div>
            </div>

            <div className='float-end'>
              <button className="btn btn-success" onClick={handleSaveCategory} disabled={loader}>Upload</button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Test;
