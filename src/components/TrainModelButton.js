import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button, Spinner } from 'react-bootstrap';

const TrainModelButton = ({ data, maxStudents, setPredictions }) => {
  const [isTraining, setIsTraining] = useState(false);

  const trainModel = async () => {
    try {
      setIsTraining(true);

      const parsedData = data
        .filter((d) => d.semester && d.courseCode && d.totalStudentsEnrolled) 
        .map((d) => ({
          semester: parseFloat(d.semester.replace('-', '.')), 
          courseCode: d.courseCode,
          totalStudents: parseInt(d.totalStudentsEnrolled, 10),
        }));

      if (parsedData.length === 0) {
        alert('No valid data to train the model. Please check your input.');
        setIsTraining(false);
        return;
      }

      const semesters = parsedData.map((d) => d.semester);
      const enrollments = parsedData.map((d) => d.totalStudents);

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

      const xs = tf.tensor2d(semesters, [semesters.length, 1]);
      const ys = tf.tensor2d(enrollments, [enrollments.length, 1]);

      // Train the model
      await model.fit(xs, ys, { epochs: 100 });

      // Make predictions for the next semester
      const predictions = parsedData.map((d) => {
        const predictedEnrollment = model.predict(tf.tensor2d([d.semester + 0.5], [1, 1])).dataSync()[0];
        return {
          courseCode: d.courseCode,
          predictedEnrollment: Math.round(predictedEnrollment),
          predictedSections: Math.ceil(predictedEnrollment / maxStudents),
        };
      });

      setPredictions(predictions);
    } catch (error) {
      console.error('Error training model:', error);
      alert('An error occurred while training the model. Please check the console for details.');
    } finally {
      setIsTraining(false);
    }
  };

  const isDisabled = !data.length || !maxStudents || isTraining;

  return (
    <Button onClick={trainModel} disabled={isDisabled}>
      {isTraining ? <Spinner animation="border" size="sm" /> : 'Train Model'}
    </Button>
  );
};

export default TrainModelButton;
