import { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const App = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [buffer, setBuffer] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (model) {
      const detectObjects = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const predictions = await model.detect(videoRef.current);
          setBuffer((prevBuffer) => {
            const newBuffer = [...prevBuffer, predictions];
            if (newBuffer.length > 5) newBuffer.shift(); // Keep buffer size at 5
            return newBuffer;
          });

          const smoothedPredictions = buffer.flat().reduce((acc, pred) => {
            const key = `${pred.class}-${pred.bbox.join('-')}`;
            if (!acc[key]) {
              acc[key] = { ...pred, count: 1 };
            } else {
              acc[key].bbox[0] += pred.bbox[0];
              acc[key].bbox[1] += pred.bbox[1];
              acc[key].bbox[2] += pred.bbox[2];
              acc[key].bbox[3] += pred.bbox[3];
              acc[key].count += 1;
            }
            return acc;
          }, {});

          const averagedPredictions = Object.values(smoothedPredictions).map(pred => ({
            ...pred,
            bbox: pred.bbox.map(coord => coord / pred.count)
          }));

          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          
          averagedPredictions.forEach(prediction => {
            ctx.beginPath();
            ctx.rect(...prediction.bbox);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.stroke();
            ctx.fillText(
              `${prediction.class} - ${Math.round(prediction.score * 100)}%`,
              prediction.bbox[0],
              prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
            );
          });

          requestAnimationFrame(detectObjects);
        } else {
          requestAnimationFrame(detectObjects);
        }
      };
      detectObjects();
    }
  }, [model, buffer]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });
  };

  return (
    <div>
      <h1>Object Detection</h1>
      <button onClick={startVideo}>Start Video</button>
      <div style={{ position: 'relative', width: '600px', height: '400px' }}>
        <video
          ref={videoRef}
          width="600"
          height="400"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          onLoadedMetadata={() => {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }}
        />
        <canvas
          ref={canvasRef}
          width="600"
          height="400"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
        />
      </div>
    </div>
  );
};

export default App;
