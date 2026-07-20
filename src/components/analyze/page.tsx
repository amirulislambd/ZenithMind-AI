"use client";
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { analyzeCSV } from '../../lib/api/ai';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AnalyzePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setLoading(true);
    setError(null);
    analyzeCSV(f)
      .then((res) => setData(res))
      .catch((e: any) => setError(e?.message || String(e)))
      .finally(() => setLoading(false));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] }, maxFiles: 1, maxSize: 5 * 1024 * 1024 });

  async function handleDownloadPDF() {
    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.body.appendChild(s);
      });
    }

    async function getLib(cdn: string, globalVar: string) {
      await loadScript(cdn);
      // @ts-ignore
      return (window as any)[globalVar];
    }

    const jsPDFLib = await getLib(
      "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
      "jspdf",
    );
    const html2canvasLib = await getLib(
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
      "html2canvas",
    );

    if (!containerRef.current) return;

    // html2canvasLib may be function or namespace exposing default
    const html2canvasFn = (html2canvasLib && (html2canvasLib.default || html2canvasLib)) as any;
    const canvas = await html2canvasFn(containerRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // jsPDFLib may expose jsPDF constructor under .jsPDF, or be the constructor itself
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsPDFCtor: any = jsPDFLib?.jsPDF || jsPDFLib?.default || jsPDFLib;
    const pdf = new jsPDFCtor('p', 'mm', 'a4');
    const imgProps = (pdf as any).getImageProperties(imgData);
    const pdfWidth = (pdf as any).internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('analysis-report.pdf');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-neutral-50 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-2 text-[#0b1220]">AI Data Analyzer</h2>
        <p className="text-sm text-neutral-600 mb-4">Upload a CSV to receive AI-powered KPIs, trend charts, and risk flags.</p>

        <div {...getRootProps()} className={`rounded-xl p-6 text-center border-2 ${isDragActive ? 'border-accent' : 'border-dashed border-neutral-200'} bg-white`}>
        <input {...getInputProps()} />
        <p className="mb-2">Drag & drop a CSV file here, or click to browse.</p>
        <p className="text-sm text-neutral-500">Maximum size: 5MB. Only .csv files accepted.</p>
      </div>
      </div>

      {loading && (
        <div className="mt-6 p-6 bg-neutral-50 rounded-xl">Processing file — this may take a moment...</div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl">Error: {error}</div>
      )}

      {data && (
        <div className="mt-6 space-y-4" ref={containerRef}>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(data.kpis || []).map((k: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-sm text-neutral-500">{k.name}</div>
                <div className="text-xl font-semibold">{k.value}</div>
                <div className={`text-sm ${k.change && String(k.change).startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{k.change}</div>
              </div>
            ))}
          </section>

          <section className="mt-4 p-4 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Trends</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={data.trends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(data.risks || []).map((r: any, idx: number) => {
              const bg = r.severity === 'high' ? 'bg-red-50' : r.severity === 'medium' ? 'bg-orange-50' : 'bg-neutral-50';
              const border = r.severity === 'high' ? 'border-red-200' : r.severity === 'medium' ? 'border-orange-200' : 'border-neutral-200';
              return (
                <div key={idx} className={`p-4 rounded-xl border ${border} ${bg}`}>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-neutral-600 mt-2">{r.description}</div>
                  <div className="text-xs mt-3 text-neutral-500">Severity: {r.severity}</div>
                </div>
              );
            })}
          </section>

          <div className="mt-6 flex gap-3">
            <button onClick={handleDownloadPDF} className="px-4 py-2 rounded-xl bg-accent text-white">Download PDF Report</button>
            <button onClick={() => { setData(null); setError(null); }} className="px-4 py-2 rounded-xl border">Analyze another file</button>
          </div>
        </div>
      )}
    </div>
  );
}
