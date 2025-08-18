"use client";
import { useState } from "react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Festival Offer",
      content: "Get 20% off on all products this Diwali!",
    },
    {
      id: 2,
      title: "New Launch",
      content: "Check out our brand new collection now.",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: "", content: "" });

  const handleSaveTemplate = () => {
    if (!newTemplate.title || !newTemplate.content) return;
    setTemplates([...templates, { ...newTemplate, id: Date.now() }]);
    setNewTemplate({ title: "", content: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Manage Templates
      </h1>

      {/* Add New Template Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-6 py-2 bg-black text-white rounded-lg shadow-md hover:shadow-lg transition"
      >
        + Create New Template
      </button>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border-2 border-dotted border-gray-400 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {template.title}
            </h2>
            <p className="text-gray-600 text-sm">{template.content}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ➕ New Template
            </h2>

            <input
              type="text"
              placeholder="Template Title"
              value={newTemplate.title}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, title: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Template Content"
              rows="4"
              value={newTemplate.content}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, content: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
