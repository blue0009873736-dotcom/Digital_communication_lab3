import React from 'react';

export default function ControlPanel({ f1, setF1, f2, setF2, fs, setFs }) {
  return (
    <div className="control-panel">
      <div className="header">
        <h1>Signal Explorer</h1>
        <p>Interactive DSP Sampling & Aliasing</p>
      </div>

      <div className="control-group">
        <div className="control-item">
          <label>
            <span>Frequency 1 (f₁)</span>
            <span>{f1} Hz</span>
          </label>
          <input 
            type="range" min="1" max="50" value={f1} 
            onChange={(e) => setF1(Number(e.target.value))} 
          />
        </div>

        <div className="control-item">
          <label>
            <span>Frequency 2 (f₂)</span>
            <span>{f2} Hz</span>
          </label>
          <input 
            type="range" min="1" max="50" value={f2} 
            onChange={(e) => setF2(Number(e.target.value))} 
          />
        </div>

        <div className="control-item" style={{marginTop: '1rem'}}>
          <label style={{color: 'var(--accent-purple)'}}>
            <span>Sampling Freq (f_s)</span>
            <span>{fs} Hz</span>
          </label>
          <input 
            type="range" min="5" max="150" value={fs} 
            onChange={(e) => setFs(Number(e.target.value))} 
          />
          
          <div className="preset-buttons">
            <button className="preset-btn" onClick={() => setFs(100)}>
              Above Nyquist (100 Hz)
            </button>
            <button className="preset-btn" onClick={() => setFs(50)}>
              At Nyquist (50 Hz)
            </button>
            <button className="preset-btn" onClick={() => setFs(30)}>
              Below Nyquist (30 Hz)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
