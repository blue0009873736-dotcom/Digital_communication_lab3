// src/dsp.js
import fft from 'fft-js';

// Sinc function
const sinc = (x) => {
    if (x === 0) return 1;
    return Math.sin(Math.PI * x) / (Math.PI * x);
};

// Sinc interpolation matching Python implementation
export const sincInterp = (x_samp, t_samp, t_cont) => {
    if (x_samp.length !== t_samp.length) {
        throw new Error("x_samp and t_samp must be the same length");
    }
    const T = t_samp[1] - t_samp[0];
    const y = new Array(t_cont.length).fill(0);
    
    for (let i = 0; i < t_cont.length; i++) {
        let sum = 0;
        for (let j = 0; j < t_samp.length; j++) {
            const arg = (t_cont[i] - t_samp[j]) / T;
            sum += x_samp[j] * sinc(arg);
        }
        y[i] = sum;
    }
    return y;
};

// Generate signal points
export const generateSignal = (f1, f2, t) => {
    return t.map(time => Math.sin(2 * Math.PI * f1 * time) + 0.5 * Math.sin(2 * Math.PI * f2 * time));
};

// Compute spectrum using FFT
export const computeSpectrum = (t, x) => {
    if (!x || x.length === 0) return { freqs: [], mags: [] };
    
    const N = x.length;
    const dt = t[1] - t[0];
    
    // fft-js requires power of 2 length. We'll zero pad to the next power of 2
    let pow2 = 1;
    while(pow2 < N) pow2 *= 2;
    
    const paddedX = new Array(pow2).fill(0);
    for(let i=0; i<N; i++) paddedX[i] = x[i];
    
    const phasors = fft.fft(paddedX);
    const magnitudes = fft.util.fftMag(phasors);
    
    // fftFreq returns positive frequencies up to Nyquist
    const freqs = fft.util.fftFreq(phasors, 1/dt);
    
    // Normalize and shift to center zero frequency
    const shiftedFreqs = [];
    const shiftedMags = [];
    
    const half = magnitudes.length / 2;
    
    // Negative frequencies
    for(let i=half; i<magnitudes.length; i++) {
        // freqs[i] is positive, representing the alias of negative frequency. We map it back.
        // Or simply construct the axis manually
        let freq = (i - magnitudes.length) / (pow2 * dt);
        shiftedFreqs.push(freq);
        shiftedMags.push(magnitudes[i] / pow2);
    }
    // Positive frequencies
    for(let i=0; i<half; i++) {
        let freq = i / (pow2 * dt);
        shiftedFreqs.push(freq);
        shiftedMags.push(magnitudes[i] / pow2);
    }
    
    return { freqs: shiftedFreqs, mags: shiftedMags };
};
