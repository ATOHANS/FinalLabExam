import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InputForm from './components/InputForm';
import TrainModelButton from './components/TrainModelButton';
import PredictionTable from './components/PredictionTable';
import Visualization from './components/Visualization';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);

  return (
    <Container>
      <h1 className="text-center my-4">IskulBukol University</h1>
      <Row>
        <Col md={6}>
          <InputForm setData={setData} setMaxStudents={setMaxStudents} />
        </Col>
        <Col md={6}>
          <TrainModelButton data={data} maxStudents={maxStudents} setPredictions={setPredictions} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <PredictionTable predictions={predictions} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Visualization predictions={predictions} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
