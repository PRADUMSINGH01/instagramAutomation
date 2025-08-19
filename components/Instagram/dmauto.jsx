"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  MessageCircle,
  Plus,
  Send,
  Clock,
  Tag,
  ArrowLeft,
  Trash2,
  Settings,
  ChevronRight,
  GripVertical,
  X as XIcon,
} from "lucide-react";

// --- MOCK CONTEXT & HELPERS (for standalone demonstration) ---
const StandaloneContext = createContext();
const useStandaloneContext = () => useContext(StandaloneContext);

const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("/dm-automation");
  const value = { activePage, setActivePage };
  return (
    <StandaloneContext.Provider value={value}>
      {children}
    </StandaloneContext.Provider>
  );
};

// --- REUSABLE UI COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div
    className={`border border-dotted border-black rounded-xl bg-white p-6 ${className}`}
  >
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title, children }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <h2 className="text-2xl font-bold flex items-center gap-3">
      <Icon className="w-7 h-7 text-black" />
      {title}
    </h2>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

// --- DM AUTOMATION COMPONENTS ---

/**
 * @typedef {'send_message' | 'add_delay' | 'add_tag'} NodeType
 */

/**
 * @typedef {object} NodeObject
 * @property {number} id
 * @property {NodeType} type
 * @property {object} data
 */

const NODE_TYPE_MAP = {
  send_message: {
    icon: Send,
    title: "Send Message",
    description: "Sends a direct message.",
  },
  add_delay: {
    icon: Clock,
    title: "Add Delay",
    description: "Pauses the flow for a period.",
  },
  add_tag: {
    icon: Tag,
    title: "Add Tag",
    description: "Adds a tag to the user.",
  },
};

/**
 * A popover menu for adding a new node to the workflow.
 * @param {{ onSelect: (type: NodeType) => void, onClose: () => void }} props
 */
const AddNodePopover = ({ onSelect, onClose }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute z-20 w-60 bg-white border border-dotted border-black rounded-xl shadow-xl p-2"
    >
      {Object.entries(NODE_TYPE_MAP).map(([type, { icon: Icon, title }]) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 transition-colors text-left"
        >
          <Icon className="w-5 h-5 text-zinc-500" />
          <span>{title}</span>
        </button>
      ))}
    </div>
  );
};

/**
 * Renders a single draggable node in the workflow canvas.
 * @param {{ node: NodeObject, index: number, onSelect: (id: number) => void, isSelected: boolean, onDragStart: (e, index: number) => void, onDragEnter: (e, index: number) => void, onDragEnd: () => void }} props
 */
const WorkflowNode = ({
  node,
  index,
  onSelect,
  isSelected,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const { icon: Icon, title } = NODE_TYPE_MAP[node.type];
  const summary = node.data.content
    ? `"${node.data.content.substring(0, 30)}..."`
    : node.data.duration || node.data.tagName;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className="w-full px-4 group relative"
    >
      <div
        onClick={() => onSelect(node.id)}
        className={`w-full max-w-sm mx-auto p-4 border border-dotted rounded-xl cursor-pointer transition-all duration-200 ${
          isSelected
            ? "border-black bg-white shadow-lg scale-105"
            : "border-zinc-300 bg-white hover:border-black"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 text-zinc-400 group-hover:text-black transition-colors">
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex-shrink-0 bg-zinc-100 p-3 rounded-lg">
            <Icon className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-black truncate">
              {index + 1}. {title}
            </p>
            {summary && (
              <p className="text-sm text-zinc-600 truncate">{summary}</p>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </div>
  );
};

/**
 * Sidebar panel for editing the properties of a selected node.
 * @param {{ node: NodeObject, onUpdate: (id: number, data: object) => void, onDeselect: () => void, onDelete: (id:number) => void }} props
 */
const NodeEditorPanel = ({ node, onUpdate, onDeselect, onDelete }) => {
  if (!node) return null;

  const [formData, setFormData] = useState(node.data);
  const { title } = NODE_TYPE_MAP[node.type];

  useEffect(() => {
    setFormData(node.data);
  }, [node]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(node.id, formData);
    onDeselect();
  };

  const renderEditor = () => {
    switch (node.type) {
      case "send_message":
        return (
          <textarea
            name="content"
            rows="5"
            value={formData.content || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
            placeholder="Type your message here..."
          />
        );
      case "add_delay":
        return (
          <input
            type="text"
            name="duration"
            value={formData.duration || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
            placeholder="e.g., 5 minutes, 1 hour"
          />
        );
      case "add_tag":
        return (
          <input
            type="text"
            name="tagName"
            value={formData.tagName || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
            placeholder="e.g., 'interested-customer'"
          />
        );
      default:
        return <p>No editor available.</p>;
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-dotted border-black z-40 p-6 flex flex-col transform transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onDeselect}
          className="flex items-center gap-2 font-bold p-2 -ml-2 rounded-lg hover:bg-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={() => onDelete(node.id)}
          className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto space-y-4">
        <h3 className="text-lg font-bold">Editing: {title}</h3>
        {renderEditor()}
      </div>
      <div className="mt-6 flex-shrink-0">
        <button
          onClick={handleSave}
          className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const DMAutomationPage = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: "send_message", data: { content: "Thanks for following!" } },
    { id: 2, type: "add_delay", data: { duration: "10 minutes" } },
    {
      id: 3,
      type: "send_message",
      data: { content: "By the way, check out our new product!" },
    },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [popoverIndex, setPopoverIndex] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleSelectNode = (id) => setSelectedNodeId(id);
  const handleDeselectNode = () => setSelectedNodeId(null);

  const handleAddNode = (type, index) => {
    const newNode = { id: Date.now(), type, data: {} };
    const newNodes = [...nodes];
    newNodes.splice(index, 0, newNode);
    setNodes(newNodes);
    setSelectedNodeId(newNode.id);
    setPopoverIndex(null);
  };

  const handleUpdateNode = (id, data) =>
    setNodes(nodes.map((n) => (n.id === id ? { ...n, data } : n)));
  const handleDeleteNode = (id) => {
    setNodes(nodes.filter((n) => n.id !== id));
    handleDeselectNode();
  };

  const onDragStart = (e, position) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const onDragEnd = () => {
    const newNodes = [...nodes];
    const dragItemContent = newNodes[dragItem.current];
    newNodes.splice(dragItem.current, 1);
    newNodes.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setNodes(newNodes);
  };

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <div className="flex flex-col h-full">
      <SectionHeader
        icon={MessageCircle}
        title="DM Automation: Welcome Message"
      >
        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors">
          Save Flow
        </button>
      </SectionHeader>

      <Card className="flex-grow !p-0 overflow-hidden">
        <div className="h-full overflow-y-auto bg-zinc-50 p-4 sm:p-8">
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 -translate-x-1/2"></div>
            <div className="space-y-0 relative z-10">
              <Card className="p-4 text-center w-full max-w-sm mx-auto">
                <p className="font-bold">TRIGGER</p>
                <p className="text-sm text-zinc-600">
                  When a user sends their first message.
                </p>
              </Card>

              {nodes.length === 0 && (
                <div className="text-center py-10">
                  <button
                    onClick={() => setPopoverIndex(0)}
                    className="mx-auto my-4 w-10 h-10 bg-white border-2 border-dashed border-zinc-400 rounded-full flex items-center justify-center hover:border-black hover:text-black transition-colors text-zinc-500"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <p className="text-zinc-600">Add your first step</p>
                </div>
              )}

              {nodes.map((node, index) => (
                <div key={node.id} className="relative py-4">
                  <div className="relative h-8 flex justify-center items-center">
                    <button
                      onClick={() => setPopoverIndex(index)}
                      className="w-8 h-8 bg-white border border-dotted border-zinc-400 rounded-full flex items-center justify-center hover:border-black hover:scale-110 transition-all text-zinc-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {popoverIndex === index && (
                      <AddNodePopover
                        onClose={() => setPopoverIndex(null)}
                        onSelect={(type) => handleAddNode(type, index)}
                      />
                    )}
                  </div>
                  <WorkflowNode
                    node={node}
                    index={index}
                    onSelect={handleSelectNode}
                    isSelected={selectedNodeId === node.id}
                    onDragStart={onDragStart}
                    onDragEnter={onDragEnter}
                    onDragEnd={onDragEnd}
                  />
                </div>
              ))}
              {nodes.length > 0 && (
                <div className="relative h-8 flex justify-center items-center">
                  <button
                    onClick={() => setPopoverIndex(nodes.length)}
                    className="w-8 h-8 bg-white border border-dotted border-zinc-400 rounded-full flex items-center justify-center hover:border-black hover:scale-110 transition-all text-zinc-500"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {popoverIndex === nodes.length && (
                    <AddNodePopover
                      onClose={() => setPopoverIndex(null)}
                      onSelect={(type) => handleAddNode(type, nodes.length)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {selectedNode && (
        <NodeEditorPanel
          node={selectedNode}
          onUpdate={handleUpdateNode}
          onDeselect={handleDeselectNode}
          onDelete={handleDeleteNode}
        />
      )}
      {selectedNode && (
        <div
          onClick={handleDeselectNode}
          className="fixed inset-0 bg-black/30 z-30"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

// --- Main App Component (for demonstration) ---
export default function DM_AUTOMATION() {
  return (
    <AppProvider>
      <div
        className="p-6 bg-zinc-50 font-sans text-black"
        style={{ height: "90vh" }}
      >
        <DMAutomationPage />
      </div>
    </AppProvider>
  );
}
