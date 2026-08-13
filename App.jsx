import React, { useState, useMemo } from 'react';
import ControlPanel from './ControlPanel';
import SignalCharts from './SignalCharts';
import { generateSignal, sincInterp, computeSpectrum } from './dsp';

function App() {
  const [f1, setF1] = useState(10);
  const [f2, setF2] = useState(25);
  const [fs, setFs] = useState(50);

  const dspData = useMemo(() => {
    // Continuous time (high resolution, e.g., 512 points for FFT)
    const N_cont = 1024;
    const fs_cont = 1000;
    const t_cont = Array.from({length: N_cont}, (_, i) => i / fs_cont);
    const x_cont = generateSignal(f1, f2, t_cont);

    // Sampled time
    const N_samp = Math.floor(1 * fs); // 1 second duration
    const t_samp = Array.from({length: N_samp}, (_, i) => i / fs);
    const x_samp = generateSignal(f1, f2, t_samp);

    // Reconstruction
    let x_recon = [];
    if (t_samp.length > 0) {
       x_recon = sincInterp(x_samp, t_samp, t_cont);
    } else {
       x_recon = new Array(N_cont).fill(0);
    }

    // Error
    const error = x_cont.map((val, i) => val - x_recon[i]);

    // Spectra
    const spec_cont = computeSpectrum(t_cont, x_cont);
    const spec_samp = computeSpectrum(t_samp, x_samp);
    const spec_recon = computeSpectrum(t_cont, x_recon);

    return {
      t_cont, x_cont,
      t_samp, x_samp,
      x_recon, error,
      freqs_cont: spec_cont.freqs, X_cont: spec_cont.mags,
      freqs_samp: spec_samp.freqs, X_samp: spec_samp.mags,
      freqs_recon: spec_recon.freqs, X_recon: spec_recon.mags,
    };
  }, [f1, f2, fs]);

  return (
    <div className="app-container">
      <ControlPanel 
        f1={f1} setF1={setF1} 
        f2={f2} setF2={setF2} 
        fs={fs} setFs={setFs} 
      />
      <SignalCharts data={dspData} />
    </div>
  );
}

export default App;
