"use client";
import React, { useMemo, useState } from "react";
import {
  Menu,
  X,
  Home,
  Send,
  Users,
  FileText,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import TemplatesSection from "@/components/whatsapp/TemplatesSection";
import MessageStats from "@/components/whatsapp/Analytic";
import RegisterPopup from "@/components/whatsapp/WhatsAppConnet";
/**
 * Production-style WhatsApp Bulk Messaging Wizard (MVP)
 * - Black navbar + White sidebar (professional B/W theme)
 * - Stepper flow: 1) Upload Numbers 2) Choose/Create Template 3) Schedule 4) Review & Post
 * - Clean, shadowed cards, rounded corners, responsive
 * - Mock handlers + validation gates ready to wire to your API
 *
 * Drop into Next.js (app or pages). Tailwind required. Icons via lucide-react.
 */

export default function WhatsAppBulkWizardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("bulk");

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 md:w-64 bg-white border-r border-zinc-200 shadow-sm transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200">
          <div className="text-xl font-bold tracking-tight">
            <RegisterPopup />
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          <SideItem
            icon={Home}
            label="Dashboard"
            active={activeRoute === "home"}
            onClick={() => setActiveRoute("home")}
          />
          <SideItem
            icon={Send}
            label="Bulk Messages"
            active={activeRoute === "bulk"}
            onClick={() => setActiveRoute("bulk")}
          />
          <SideItem
            icon={Users}
            label="Contacts"
            active={activeRoute === "contacts"}
            onClick={() => setActiveRoute("contacts")}
          />
          <SideItem
            icon={FileText}
            label="Templates"
            active={activeRoute === "templates"}
            onClick={() => setActiveRoute("templates")}
          />
          <SideItem
            icon={Settings}
            label="Settings"
            active={activeRoute === "settings"}
            onClick={() => setActiveRoute("settings")}
          />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar (black) */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-black text-white px-4 md:px-6 py-3 shadow-md">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-base md:text-lg font-semibold tracking-tight">
              {routeTitle(activeRoute)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-zinc-200">
              Hello, Pradum
            </span>
            <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center ring-1 ring-white/20">
              PS
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeRoute === "bulk" ? <BulkWizard /> : <></>}
          {activeRoute === "templates" ? <TemplatesSection /> : <></>}
          {activeRoute === "home" ? <MessageStats /> : ""}
        </main>
      </div>
    </div>
  );
}

function routeTitle(key) {
  switch (key) {
    case "home":
      return "Dashboard";
    case "bulk":
      return "Bulk Messages";
    case "contacts":
      return "Contacts";
    case "templates":
      return "Templates";
    case "settings":
      return "Settings";
    default:
      return "ZapChat";
  }
}

const SideItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition shadow-sm ${
      active
        ? "bg-zinc-900 text-white shadow-md"
        : "text-zinc-700 hover:bg-zinc-100"
    }`}
  >
    <Icon className="h-4 w-4" />
    <span className="truncate">{label}</span>
  </button>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200 ${className}`}
  >
    {children}
  </div>
);

function Placeholder({ name }) {
  return (
    <Card className="p-8 grid place-items-center min-h-[40vh] text-zinc-600">
      <p className="text-center">"{name}" page coming soon.</p>
      <TemplatesSection />
    </Card>
  );
}

// ---------------------------
// Bulk Messaging Wizard
// ---------------------------
function BulkWizard() {
  const steps = [
    { key: 1, title: "Upload Numbers", icon: Users },
    { key: 2, title: "Choose Template", icon: FileText },
    { key: 3, title: "Schedule", icon: Clock },
    { key: 4, title: "Review & Post", icon: CheckCircle2 },
  ];

  const [step, setStep] = useState(1);

  // Step 1: Audience
  const [rawNumbers, setRawNumbers] = useState("");
  const [fileName, setFileName] = useState("");

  const parsed = useMemo(() => parseNumbers(rawNumbers), [rawNumbers]);

  // Step 2: Templates
  const [templates, setTemplates] = useState([
    {
      id: "welcome",
      name: "Welcome Offer",
      body: "Hi {{name}}, welcome to ZapChat! Enjoy 10% off with code WELCOME10.",
    },
    {
      id: "reminder",
      name: "Payment Reminder",
      body: "Hello {{name}}, your payment for invoice {{invoice_id}} is due on {{due_date}}.",
    },
    {
      id: "promo",
      name: "Festive Promo",
      body: "Hi {{name}}, festive deals are live! Grab {{discount}} off today.",
    },
  ]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("welcome");
  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) || null,
    [templates, selectedTemplateId]
  );
  const [newTplOpen, setNewTplOpen] = useState(false);
  const [newTplDraft, setNewTplDraft] = useState({
    name: "",
    body: "Hi {{name}}, ...",
  });

  // Step 3: Schedule
  const [mode, setMode] = useState("now"); // now | schedule
  const [when, setWhen] = useState(""); // local datetime

  // Final: submission
  const canNext = useMemo(() => {
    if (step === 1) return parsed.valid.length > 0;
    if (step === 2) return !!selectedTemplate;
    if (step === 3) return mode === "now" || Boolean(when);
    return true;
  }, [step, parsed.valid.length, selectedTemplate, mode, when]);

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleUpload = async (file) => {
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    setRawNumbers((prev) => (prev ? prev + "\n" : "") + text);
  };

  const addNewTemplate = () => {
    const id = newTplDraft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!id || !newTplDraft.body.trim()) return;
    setTemplates((prev) => [
      { id, name: newTplDraft.name, body: newTplDraft.body },
      ...prev,
    ]);
    setSelectedTemplateId(id);
    setNewTplOpen(false);
    setNewTplDraft({ name: "", body: "Hi {{name}}, ..." });
  };

  const handleSubmit = () => {
    // Replace with your API call (queue + template variables)
    const payload = {
      numbers: parsed.valid,
      invalid: parsed.invalid,
      template: selectedTemplate,
      schedule:
        mode === "now" ? { type: "now" } : { type: "schedule", at: when },
    };
    console.log("POST /api/campaigns", payload);
    alert("Campaign queued successfully! Check console for payload.");
    // Optionally: reset wizard or navigate
  };

  return (
    <div className="space-y-5">
      {/* Stepper */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-2">
          {steps.map((s, i) => (
            <StepItem
              key={s.key}
              index={i}
              title={s.title}
              icon={s.icon}
              active={step === s.key}
              done={step > s.key}
            />
          ))}
        </div>
      </Card>

      {/* Panels */}
      {step === 1 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            1. Upload Numbers
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Upload a CSV/TXT file or paste numbers. We deduplicate and validate
            basic formats (E.164, 10–15 digits).
          </p>

          {/* Upload */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <label className="rounded-2xl border-2 border-dashed border-zinc-300 p-6 text-center cursor-pointer hover:bg-zinc-50">
              <input
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files?.[0])}
              />
              <div className="text-sm">
                Drop CSV/TXT here or <span className="underline">browse</span>
              </div>
              {fileName && (
                <div className="mt-2 text-xs text-zinc-500">
                  Selected: {fileName}
                </div>
              )}
            </label>

            <div>
              <label className="text-sm font-medium">
                Paste numbers (comma, space or newline separated)
              </label>
              <textarea
                rows={8}
                value={rawNumbers}
                onChange={(e) => setRawNumbers(e.target.value)}
                placeholder="e.g. +919999888877, 9876543210, +1 415 555 0199"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-900"
              />
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Valid:{" "}
                  {parsed.valid.length}
                </span>
                <span className="inline-flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-600" /> Invalid:{" "}
                  {parsed.invalid.length}
                </span>
                <span className="inline-flex items-center gap-1">
                  Unique after dedupe: {parsed.valid.length}
                </span>
              </div>
            </div>
          </div>

          {parsed.preview.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium">
                Preview (first {parsed.preview.length})
              </p>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {parsed.preview.map((n) => (
                  <div
                    key={n}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              2. Choose a Template
            </h2>
            <button
              onClick={() => setNewTplOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-3 py-2 text-sm shadow hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" /> New Template
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplateId(t.id)}
                className={`text-left rounded-2xl border p-4 shadow-sm hover:shadow-md transition ${
                  selectedTemplateId === t.id
                    ? "border-zinc-900"
                    : "border-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{t.name}</p>
                  <input
                    type="radio"
                    checked={selectedTemplateId === t.id}
                    readOnly
                  />
                </div>
                <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                  {t.body}
                </p>
              </button>
            ))}
          </div>

          {selectedTemplate && (
            <div className="mt-6">
              <p className="text-sm font-medium">Preview</p>
              <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 shadow-inner">
                {selectedTemplate.body}
              </div>
            </div>
          )}

          {/* New Template Modal */}
          <Modal
            open={newTplOpen}
            onClose={() => setNewTplOpen(false)}
            title="Create Template"
          >
            <div className="space-y-3">
              <label className="block text-sm font-medium">Template Name</label>
              <input
                value={newTplDraft.name}
                onChange={(e) =>
                  setNewTplDraft((d) => ({ ...d, name: e.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none"
                placeholder="Payment Reminder"
              />
              <label className="block text-sm font-medium">Body</label>
              <textarea
                rows={6}
                value={newTplDraft.body}
                onChange={(e) =>
                  setNewTplDraft((d) => ({ ...d, body: e.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none"
                placeholder="Hello {{name}}, your order {{order_id}} ships on {{ship_date}}."
              />
              <p className="text-xs text-zinc-500">
                Use variables like . (For WhatsApp HSMs, submit for approval in
                production.)
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewTplOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewTemplate}
                  className="rounded-xl bg-zinc-900 text-white px-4 py-2 text-sm shadow hover:bg-zinc-800"
                >
                  Save Template
                </button>
              </div>
            </div>
          </Modal>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">3. Schedule</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Send immediately or schedule a date/time (IST).
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setMode("now")}
              className={`rounded-2xl border p-4 text-left shadow-sm hover:shadow-md ${
                mode === "now" ? "border-zinc-900" : "border-zinc-200"
              }`}
            >
              <p className="font-medium">Send Now</p>
              <p className="text-sm text-zinc-600">
                Queue instantly after confirmation.
              </p>
            </button>
            <button
              onClick={() => setMode("schedule")}
              className={`rounded-2xl border p-4 text-left shadow-sm hover:shadow-md ${
                mode === "schedule" ? "border-zinc-900" : "border-zinc-200"
              }`}
            >
              <p className="font-medium">Schedule</p>
              <p className="text-sm text-zinc-600">Choose a date & time.</p>
            </button>
            <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
              <label className="text-sm font-medium">When</label>
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none"
                disabled={mode !== "schedule"}
              />
              <p className="mt-2 text-xs text-zinc-500">
                Timezone: Asia/Kolkata (IST)
              </p>
            </div>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            4. Review & Post
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
              <p className="text-sm font-medium">Audience</p>
              <ul className="mt-2 text-sm text-zinc-700 list-disc pl-5">
                <li>{parsed.valid.length} recipients</li>
                {parsed.invalid.length > 0 && (
                  <li className="text-amber-700">
                    {parsed.invalid.length} invalid numbers ignored
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
              <p className="text-sm font-medium">Template</p>
              <p className="mt-2 text-sm text-zinc-700">
                <span className="font-medium">{selectedTemplate?.name}</span>
              </p>
              <div className="mt-2 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-800 border border-zinc-200 shadow-inner">
                {selectedTemplate?.body}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
              <p className="text-sm font-medium">Schedule</p>
              <p className="mt-2 text-sm text-zinc-700">
                {mode === "now"
                  ? "Send immediately"
                  : `Scheduled for ${when || "(choose a time)"}`}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
              <p className="text-sm font-medium">Safety</p>
              <ul className="mt-2 text-sm text-zinc-700 list-disc pl-5">
                <li>Respect template approval for marketing messages.</li>
                <li>Include opt-out if required by policy.</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={step === 1}
          className="rounded-xl px-4 py-2 text-sm hover:bg-zinc-100 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Back
        </button>
        <div className="flex items-center gap-2">
          {step < 4 ? (
            <button
              onClick={goNext}
              disabled={!canNext}
              className="rounded-xl bg-zinc-900 text-white px-5 py-2 text-sm shadow-md hover:bg-zinc-800 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-zinc-900 text-white px-5 py-2 text-sm shadow-md hover:bg-zinc-800"
            >
              {mode === "now" ? "Send Now" : "Schedule & Post"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Utilities & UI bits
// ---------------------------
function StepItem({ index, title, icon: Icon, active, done }) {
  return (
    <div className="flex-1 flex items-center gap-3">
      <div
        className={`grid place-items-center h-9 w-9 rounded-full border text-sm shadow ${
          done
            ? "bg-emerald-600 text-white border-emerald-600"
            : active
            ? "bg-black text-white border-black"
            : "bg-white text-zinc-800 border-zinc-300"
        }`}
      >
        {done ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>
      <div className="hidden sm:block">
        <p className={`text-xs ${active ? "text-black" : "text-zinc-500"}`}>
          {title}
        </p>
      </div>
      {index < 3 && <div className="hidden sm:block h-px flex-1 bg-zinc-200" />}
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-zinc-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function parseNumbers(input) {
  if (!input) return { valid: [], invalid: [], preview: [] };
  // Split by commas, spaces, newlines
  const parts = input
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const validSet = new Set();
  const invalid = [];

  for (const raw of parts) {
    // Remove common formatting characters
    const cleaned = raw.replace(/[()\-]/g, "");
    // Accept E.164 (+country) or plain 10-15 digits
    const ok = /^\+?[0-9]{10,15}$/.test(cleaned);
    if (ok) validSet.add(cleaned);
    else invalid.push(raw);
  }

  const valid = Array.from(validSet);
  const preview = valid.slice(0, Math.min(18, valid.length));
  return { valid, invalid, preview };
}
