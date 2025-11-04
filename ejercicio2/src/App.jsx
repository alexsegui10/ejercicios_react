import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [marks, setMarks] = useState([]);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    const secondsPassed = ((now - startTime) / 1000).toFixed(1);
    setMarks([...marks, secondsPassed + ' s']);
  }

  let seconds = 0;
  if (startTime != null && now != null) {
    seconds = ((now - startTime) / 1000).toFixed(1);
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Cronòmetre</h2>
      <p>{seconds} segons</p>
      <button onClick={handleStart}>Començar</button>
      <button onClick={handleStop}>Parar</button>

      <div style={{ marginTop: '20px' }}>
        <h3>Marques:</h3>
        {marks.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </div>
  );
}
