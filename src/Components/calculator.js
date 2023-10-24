import React, { useState } from 'react';

export default function Calculator() {
  const [unit, setUnit] = useState('sqft');
  const [carpetArea, setCarpetArea] = useState('');
  const [doorWidth, setDoorWidth] = useState('');
  const [doorHeight, setDoorHeight] = useState('');
  const [numDoors, setNumDoors] = useState('');
  const [windowWidth, setWindowWidth] = useState('');
  const [windowHeight, setWindowHeight] = useState('');
  const [numWindows, setNumWindows] = useState('');
  const [paintAreaSqft, setPaintAreaSqft] = useState(0);
  const [paintAreaSqM, setPaintAreaSqM] = useState(0);

  const calculatePaintArea = () => {
    const carpetAreaValue = parseFloat(carpetArea);
    const doorArea = parseFloat(doorWidth) * parseFloat(doorHeight) * parseFloat(numDoors);
    const windowArea = parseFloat(windowWidth) * parseFloat(windowHeight) * parseFloat(numWindows);

    const paintArea = carpetAreaValue * 3.5;
    const paintAreaSqM = carpetAreaValue * 3.5;

    setPaintAreaSqft(paintArea - doorArea - windowArea);
    
    setPaintAreaSqM((paintAreaSqM - doorArea - windowArea) / 10.7639);
  };

  const calculatePaint = () => {
    const paint = (paintAreaSqft / 100).toFixed(2);
    return `${paint} liters`;
  };

  const calculatePrimer = () => {
    const primer = (paintAreaSqft / 100).toFixed(2);
    return `${primer} liters`;
  };

  const calculatePutty = () => {
    const putty = (paintAreaSqft / 40).toFixed(2);
    return `${putty} kgs`;
  };

  const resetForm = () => {
    setUnit('sqft');
    setCarpetArea('');
    setDoorWidth('');
    setDoorHeight('');
    setNumDoors('');
    setWindowWidth('');
    setWindowHeight('');
    setNumWindows('');
    setPaintAreaSqft(0);
    setPaintAreaSqM(0);
  };

  return (
    <div className="container">
      <div className='d-flex align-items-center mt-5'>
      <i class="fa-solid fa-paint-roller fs-4 me-2"></i>
      <h2 className='caption'>Paint Calculator</h2>
      </div>
      <form>
        <div className="mb-3">
          <label>Unit</label>
          <select name="unit" className="form-select" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="sqft">Sq. Ft.</option>
            <option value="sqm">Sq. Meter</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Carpet Area ({unit === 'sqft' ? 'Sq. Ft.' : 'Sq. Meter'})</label>
          <input
            name="carpetArea"
            type="number"
            className="form-control"
            value={carpetArea}
            onChange={(e) => setCarpetArea(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Door Size ({unit === 'sqft' ? 'Ft.' : 'Meter'})</label>
          <div className="d-flex">
            <input
              name="doorWidth"
              type="number"
              className="form-control me-2"
              placeholder="Width"
              value={doorWidth}
              onChange={(e) => setDoorWidth(e.target.value)}
            />
            <input
              name="doorHeight"
              type="number"
              className="form-control"
              placeholder="Height"
              value={doorHeight}
              onChange={(e) => setDoorHeight(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label>No. of Doors</label>
          <input
            name="numDoors"
            type="number"
            className="form-control"
            value={numDoors}
            onChange={(e) => setNumDoors(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Window Size ({unit === 'sqft' ? 'Ft.' : 'Meter'})</label>
          <div className="d-flex">
            <input
              name="windowWidth"
              type="number"
              className="form-control me-2"
              placeholder="Width"
              value={windowWidth}
              onChange={(e) => setWindowWidth(e.target.value)}
            />
            <input
              name="windowHeight"
              type="number"
              className="form-control"
              placeholder="Height"
              value={windowHeight}
              onChange={(e) => setWindowHeight(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label>No. of Windows</label>
          <input
            name="numWindows"
            type="number"
            className="form-control"
            value={numWindows}
            onChange={(e) => setNumWindows(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={calculatePaintArea}>
          Calculate
        </button>
        <button type="button" className="btn btn-danger ms-2" onClick={resetForm}>
          Reset
        </button>
      </form>
      <div className="mt-4">
        <h2>Results</h2>
        <p>Actual Paint Area: {unit === 'sqft' ? paintAreaSqft.toFixed(2) : paintAreaSqM.toFixed(2)} {unit === 'sqft' ? 'Sq. Ft.' : 'Sq. Meter'}</p>
        <p>Paint: {calculatePaint()}</p>
        <p>Primer: {calculatePrimer()}</p>
        <p>Putty: {calculatePutty()}</p>
      </div>
    </div>
  );
}
