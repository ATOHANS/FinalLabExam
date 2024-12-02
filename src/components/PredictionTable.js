import React from 'react';
import { Table } from 'react-bootstrap';

const PredictionTable = ({ predictions }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Course</th>
        <th>Predicted Enrollment</th>
        <th>Predicted Sections</th>
      </tr>
    </thead>
    <tbody>
      {predictions.map((prediction, index) => (
        <tr key={index}>
          <td>{prediction.courseCode}</td>
          <td>{prediction.predictedEnrollment}</td>
          <td>{prediction.predictedSections}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default PredictionTable;
