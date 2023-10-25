import React, { useState, useEffect } from 'react';
import "../App.css"

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
  const [paintAreaSqm, setPaintAreaSqm] = useState(0);
  const [paintAreaValue, setpaintAreaValue] = useState(0);
  const [doorArea, setDoorArea] = useState(0);
  const [windowArea, setWindowArea] = useState(0);

  useEffect(() => {
    const carpetAreaValue = parseFloat(carpetArea);
    let doorArea = parseFloat(doorWidth) * parseFloat(doorHeight) * parseFloat(numDoors);
    setDoorArea(doorArea.toFixed(2))
    const windowArea = parseFloat(windowWidth) * parseFloat(windowHeight) * parseFloat(numWindows);
    setWindowArea(windowArea.toFixed(2))

    let paintAreaValue = carpetAreaValue * 3.5;
    setpaintAreaValue(paintAreaValue.toFixed(2));

    if (unit === 'sqft') {
      setPaintAreaSqft(paintAreaValue - doorArea - windowArea);
      setPaintAreaSqm((paintAreaValue - doorArea - windowArea) / 10.764);
    } else {
      setPaintAreaSqm(paintAreaValue - doorArea - windowArea);
      setPaintAreaSqft((paintAreaValue - doorArea - windowArea) * 10.764);
    }
  }, [unit, carpetArea, doorWidth, doorHeight, numDoors, windowWidth, windowHeight, numWindows]);

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
    return `${putty} liters`;
  };

  const handleUnitChange = (newUnit) => {
    resetForm();
    setUnit(newUnit);
  };

  const resetForm = () => {
    setCarpetArea('');
    setDoorWidth('');
    setDoorHeight('');
    setNumDoors('');
    setWindowWidth('');
    setWindowHeight('');
    setNumWindows('');
    setPaintAreaSqft(0);
    setPaintAreaSqm(0);
  };

  let showunit = (unit === 'sqft' ? "Sq. Ft." : "Sq. Meter.");

  return (
    <>
      <div className="container mt-5 boxsha p-4" style={{ maxWidth: '80%' }}>
        <div className='d-flex align-items-center'>
          <i className="fa-solid fa-paint-roller fs-5 me-2"></i>
          <h2 className='caption text-uppercase'>Paint Calculator</h2>
        </div>
        <form>
          <div className="mb-3">
            <label>Unit</label>
            <select
              name="unit"
              className="form-select"
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
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
          <button type="button" className="btn btn-danger" onClick={resetForm}>
            Reset
          </button>
        </form>
        <div className="mt-4">
          <h2 className='caption mb-3'>Results</h2>
          <table className="table">
            <tbody>
              <tr>
                <td style={{color: 'blue'}}>Actual Paint Area</td>
                <td style={{color: 'blue'}}>
                  {unit === 'sqft'
                    ? `${paintAreaSqft.toFixed(2)} Sq. Ft. or ${paintAreaSqm.toFixed(2)} Sq. Meter`
                    : `${paintAreaSqm.toFixed(2)} Sq. Meter or ${paintAreaSqft.toFixed(2)} Sq. Ft.`}
                </td>
              </tr>
              <tr>
                <td>Paint</td>
                <td>{calculatePaint()}</td>
              </tr>
              <tr>
                <td>Primer</td>
                <td>{calculatePrimer()}</td>
              </tr>
              <tr>
                <td>Putty</td>
                <td>{calculatePutty()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className='explanation--container mt-4 container boxsha top-info pt-3 pb-3' style={{ maxWidth: '80%' }}>
        <h2 className='caption'>Paint-Work Calculation</h2>
        <hr />
        <div className="top-section text-center pt-3">
          <div className="row">
            <div className="col">
              <h5>Paint Area</h5>
              <div className='mt-3'>
                <p>Paint Area = Carpet Area x 3.5</p>
                {carpetArea && <p>Paint Area = {carpetArea} x 3.5</p>}
                {carpetArea && <p>Paint Area = {paintAreaValue} {showunit}</p>}
              </div>
            </div>
            <div className="col">
              <h5>Door & Window Area</h5>
              <div className='mt-3'>
                <p>Door Area = Width x Height x Doors</p>
                {doorArea > 0 && <p>Door Area = {doorWidth} x {doorHeight} x {numDoors}</p>}
                {doorArea > 0 && <p>Door Area = {doorArea} {showunit}</p>}
                {windowArea > 0 && <p>Window Area = {windowWidth} x {windowHeight} x {numWindows}</p>}
                {windowArea > 0 && <p>Window Area = {windowArea} {showunit}</p>}
              </div>
            </div>
            <div className="col">
              <h5>Actual Paint Area</h5>
              <div className='mt-3'>
                <p>Actual Paint Area = Carpet Area - Door Area - Window Area</p>
                {(paintAreaSqft || paintAreaSqm) ? <p>Actual Paint Area = {carpetArea} - {doorArea} - {windowArea}</p> : ""}
                {(paintAreaSqft || paintAreaSqm) ? <p>Actual Paint Area = {paintAreaSqft} Sq. Ft.</p> : ""}
                {(paintAreaSqft || paintAreaSqm) ? <p>Actual Paint Area = {paintAreaSqm} Sq. Meter</p> : ""}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="bottom-section text-center">
          <div className="row">
            <div className="col">
              <h5>Paint</h5>
              <div className='mt-3'>
                <p>Paint = Actual Paint Area / 100</p>
                {paintAreaSqft ? (<p>Paint = {paintAreaSqft} Sq. Ft. / 100</p>) : ""}
                {paintAreaSqft ? <p>Paint = {((paintAreaSqft / 100).toFixed(2))} liters</p> : ""}
              </div>
            </div>
            <div className="col">
              <h5>Premier</h5>
              <div className='mt-3'>
                <p>Premier = Actual Paint Area / 100</p>
                {paintAreaSqft ? (<p>Premier = {paintAreaSqft} Sq. Ft. / 100</p>) : ""}
                {paintAreaSqft ? <p>Premier = {((paintAreaSqft / 100).toFixed(2))} liters</p> : ""}
              </div>
            </div>
            <div className="col">
              <h5>Putty</h5>
              <div className='mt-3'>
                <p>Putty = Actual Paint Area / 40</p>
                {paintAreaSqft ? (<p>Putty = {paintAreaSqft} Sq. Ft. / 40</p>) : ""}
                {paintAreaSqft ? <p>Putty = {((paintAreaSqft / 40).toFixed(2))} kgs</p> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
