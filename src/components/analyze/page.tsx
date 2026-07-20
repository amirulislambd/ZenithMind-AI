"use client";

import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { analyzeCSV } from "../../lib/api/ai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Plus,
  Trash2,
  Upload,
  FileText,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomMetric {
  id: string;
  name: string;
  value: string;
}

export default function AnalyzePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Input Tabs State: 'form' | 'file'
  const [activeTab, setActiveTab] = useState<"form" | "file">("form");

  // Form States
  const [workHours, setWorkHours] = useState("8");
  const [sleepHours, setSleepHours] = useState("7");
  const [stressLevel, setStressLevel] = useState("Medium");
  const [journalNotes, setJournalNotes] = useState("");
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);

  // Response States
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Custom Metric Placeholders
  const placeholderSuggestions = [
    "Focus Hours (e.g., 5)",
    "Water Intake (Litres)",
    "Mood Score (1-10)",
    "Coffee Cups",
    "Exercise Minutes",
  ];

  // Add Dynamic Field
  const handleAddCustomMetric = () => {
    const nextPlaceholder =
      placeholderSuggestions[
        customMetrics.length % placeholderSuggestions.length
      ];
    setCustomMetrics((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: nextPlaceholder.split(" ")[0],
        value: "",
      },
    ]);
  };

  // Remove Dynamic Field
  const handleRemoveCustomMetric = (id: string) => {
    setCustomMetrics((prev) => prev.filter((item) => item.id !== id));
  };

  // Update Dynamic Field
  const handleUpdateCustomMetric = (
    id: string,
    field: "name" | "value",
    text: string,
  ) => {
    setCustomMetrics((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: text } : item)),
    );
  };

  // Dropzone CSV Handler
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  // Handle Form Submission (Generates Virtual CSV and Analyzes)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Build CSV content string from fixed and custom fields
      let csvContent = `Date,WorkHours,SleepHours,StressLevel,JournalNotes`;
      customMetrics.forEach((m) => {
        if (m.name) csvContent += `,${m.name.replace(/,/g, "")}`;
      });
      csvContent += `\n`;

      const today = new Date().toISOString().split("T")[0];
      const cleanNotes = journalNotes.replace(/[\r\n,]/g, " ");
      csvContent += `${today},${workHours},${sleepHours},${stressLevel},"${cleanNotes}"`;

      customMetrics.forEach((m) => {
        csvContent += `,${m.value || "0"}`;
      });

      // Create a Blob file payload for analyzeCSV
      const blob = new Blob([csvContent], { type: "text/csv" });
      const file = new File([blob], "daily_log.csv", { type: "text/csv" });

      const res = await analyzeCSV(file);
      setData(res);
    } catch (e: any) {
      setError(e?.message || "Failed to analyze daily log.");
    } finally {
      setLoading(false);
    }
  };

  // PDF Generation
  async function handleDownloadPDF() {
    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load " + src));
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

    const html2canvasFn = (html2canvasLib &&
      (html2canvasLib.default || html2canvasLib)) as any;
    const canvas = await html2canvasFn(containerRef.current, {
      scale: 2,
      backgroundColor: "#020617",
    });
    const imgData = canvas.toDataURL("image/png");

    const jsPDFCtor: any = jsPDFLib?.jsPDF || jsPDFLib?.default || jsPDFLib;
    const pdf = new jsPDFCtor("p", "mm", "a4");
    const imgProps = (pdf as any).getImageProperties(imgData);
    const pdfWidth = (pdf as any).internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("zenithmind-analysis-report.pdf");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-slate-100 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-slate-100">
          <Sparkles className="w-7 h-7 text-indigo-400" /> AI Performance &
          Health Analyzer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track daily metrics manually or upload datasets for AI-driven
          cognitive insights.
        </p>
      </div>

      {/* Input Mode Selector Tabs */}
      <div className="flex border-b border-slate-800 mb-6 gap-4">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-medium border-b-2 transition ${
            activeTab === "form"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" /> Daily Log Form
        </button>
        <button
          onClick={() => setActiveTab("file")}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-medium border-b-2 transition ${
            activeTab === "file"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Upload className="w-4 h-4" /> Upload CSV File
        </button>
      </div>

      {/* Tab 1: Daily Log Form */}
      {activeTab === "form" && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5"
        >
          <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800 pb-3">
            Today's Log Entry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Work Hours
              </label>
              <input
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 8"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Sleep Hours
              </label>
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 7"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Stress Level
              </label>
              <select
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Low">Low 😊</option>
                <option value="Medium">Medium 😐</option>
                <option value="High">High 😓</option>
                <option value="Overwhelmed">Overwhelmed 😫</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Journal / Notes
            </label>
            <textarea
              value={journalNotes}
              onChange={(e) => setJournalNotes(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none placeholder-slate-600 resize-none"
              placeholder="How was your day? Write down any thoughts or key occurrences..."
            />
          </div>

          {/* Dynamic Custom Fields Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Custom Metrics & Tasks
              </span>
              <button
                type="button"
                onClick={handleAddCustomMetric}
                className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-300 hover:bg-indigo-900 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>

            <AnimatePresence>
              {customMetrics.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleUpdateCustomMetric(item.id, "name", e.target.value)
                    }
                    placeholder={`Metric name (${placeholderSuggestions[index % placeholderSuggestions.length]})`}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) =>
                      handleUpdateCustomMetric(item.id, "value", e.target.value)
                    }
                    placeholder="Value (e.g. 5)"
                    className="w-32 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomMetric(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {loading ? "Analyzing with Groq AI..." : "Submit & Analyze"}
          </button>
        </form>
      )}

      {/* Tab 2: Upload File Mode */}
      {activeTab === "file" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div
            {...getRootProps()}
            className={`rounded-xl p-8 text-center border-2 border-dashed cursor-pointer transition ${
              isDragActive
                ? "border-indigo-500 bg-indigo-950/20"
                : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-200">
              Drag & drop a CSV dataset here, or click to browse
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Maximum size: 5MB (.csv format)
            </p>
          </div>
        </div>
      )}

      {/* Loading & Error Indicators */}
      {loading && (
        <div className="mt-6 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-indigo-400 animate-pulse">
          <Sparkles className="w-5 h-5 animate-spin" />
          <span>Processing dataset & generating insights...</span>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-950/50 border border-red-800/80 text-red-300 rounded-2xl flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* AI Analysis Results Dashboard */}
      {data && (
        <div className="mt-8 space-y-6" ref={containerRef}>
          {/* Executive Summary */}
          {data.summary && (
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> AI Executive Summary
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {data.summary}
              </p>
            </section>
          )}

          {/* KPIs Grid */}
          {data.kpis && data.kpis.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.kpis.map((k: any, i: number) => (
                <div
                  key={i}
                  className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md"
                >
                  <div className="text-xs text-slate-400 font-medium">
                    {k.name}
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mt-1">
                    {k.value}
                  </div>
                  {k.change && (
                    <div
                      className={`text-xs mt-2 font-medium ${
                        String(k.change).startsWith("-")
                          ? "text-red-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {k.change}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Trend Charts */}
          {data.trends && data.trends.length > 0 && (
            <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
              <h3 className="text-sm font-semibold text-slate-200 mb-4">
                Metric Trends Over Time
              </h3>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#f8fafc",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#818cf8"
                      strokeWidth={3}
                      dot={{ fill: "#6366f1" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Risks & Warnings */}
          {data.risks && data.risks.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.risks.map((r: any, idx: number) => {
                const isHigh = r.severity === "high";
                const isMed = r.severity === "medium";
                const bg = isHigh
                  ? "bg-red-950/30"
                  : isMed
                    ? "bg-amber-950/30"
                    : "bg-slate-900";
                const border = isHigh
                  ? "border-red-800/60"
                  : isMed
                    ? "border-amber-800/60"
                    : "border-slate-800";
                const textBadge = isHigh
                  ? "text-red-400"
                  : isMed
                    ? "text-amber-400"
                    : "text-emerald-400";

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${border} ${bg}`}
                  >
                    <div className="font-semibold text-slate-200 text-sm">
                      {r.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-2 leading-normal">
                      {r.description}
                    </div>
                    <div
                      className={`text-xs font-bold uppercase mt-3 ${textBadge}`}
                    >
                      Severity: {r.severity}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
            <button
              onClick={() => {
                setData(null);
                setError(null);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" /> Reset Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}