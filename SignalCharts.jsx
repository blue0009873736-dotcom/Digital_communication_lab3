import React from 'react';
import Plot from 'react-plotly.js';

export default function SignalCharts({ data }) {
  const {
    t_cont, x_cont,
    t_samp, x_samp,
    x_recon, error,
    freqs_cont, X_cont,
    freqs_samp, X_samp,
    freqs_recon, X_recon
  } = data;

  const layoutBase = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#94a3b8', family: 'Outfit, sans-serif' },
    margin: { t: 20, r: 20, l: 50, b: 40 },
    xaxis: { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
    yaxis: { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
    legend: { font: { color: '#ffffff' }, orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
    hovermode: 'closest'
  };

  return (
    <div className="chart-container">
      <div className="chart-card">
        <h2 className="chart-title">Time Domain</h2>
        <Plot
          data={[
            { x: t_cont, y: x_cont, type: 'scatter', mode: 'lines', name: 'Reference', line: { color: 'rgba(255, 255, 255, 0.2)', width: 2 } },
            { x: t_cont, y: x_recon, type: 'scatter', mode: 'lines', name: 'Reconstructed', line: { color: '#3b82f6', dash: 'dash', width: 2 } },
            { x: t_samp, y: x_samp, type: 'scatter', mode: 'markers', name: 'Sampled', marker: { color: '#f43f5e', size: 8, symbol: 'circle', line: { color: '#fff', width: 1 } } }
          ]}
          layout={{ ...layoutBase, xaxis: { ...layoutBase.xaxis, title: 'Time (s)', range: [0, 0.5] } }}
          useResizeHandler={true}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Magnitude Spectra</h2>
        <Plot
          data={[
            { x: freqs_cont, y: X_cont, type: 'scatter', mode: 'lines', name: 'Reference', line: { color: 'rgba(255, 255, 255, 0.2)', width: 2 } },
            { x: freqs_samp, y: X_samp, type: 'scatter', mode: 'lines', name: 'Sampled', line: { color: '#f43f5e', dash: 'dash', width: 1.5 } },
            { x: freqs_recon, y: X_recon, type: 'scatter', mode: 'lines', name: 'Reconstructed', line: { color: '#3b82f6', width: 2 } }
          ]}
          layout={{ ...layoutBase, xaxis: { ...layoutBase.xaxis, title: 'Frequency (Hz)', range: [-100, 100] } }}
          useResizeHandler={true}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      <div className="chart-card error-card">
        <h2 className="chart-title error-title">Reconstruction Error</h2>
        <Plot
          data={[
            { x: t_cont, y: error, type: 'scatter', mode: 'lines', name: 'Error', line: { color: '#10b981', width: 2 } }
          ]}
          layout={{ ...layoutBase, xaxis: { ...layoutBase.xaxis, title: 'Time (s)', range: [0, 0.5] } }}
          useResizeHandler={true}
          style={{ width: '100%', height: '280px' }}
        />
      </div>
    </div>
  );
}
