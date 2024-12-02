import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Papa from 'papaparse';

const InputForm = ({ setData, setMaxStudents }) => {
  const [maxStudentsInput, setMaxStudentsInput] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setData(result.data);
        },
        skipEmptyLines: true,
      });
    }
  };

  const handleMaxStudentsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxStudentsInput(value);
    setMaxStudents(value);
  };

  return (
    <Form>
      <Form.Group controlId="fileUpload">
        <Form.Label></Form.Label>
        <Form.Control type="file" accept="" onChange={handleFileUpload} />
      </Form.Group>
      <Form.Group controlId="maxStudents" className="mt-3">
        <Form.Label>Max Students Per Section</Form.Label>
        <Form.Control
          type="number"
          value={maxStudentsInput}
          onChange={handleMaxStudentsChange}
        />
      </Form.Group>
    </Form>
  );
};

export default InputForm;
