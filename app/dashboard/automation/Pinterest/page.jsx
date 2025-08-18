"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  Plus,
  Calendar,
  Image as ImageIcon,
  Link as LinkIcon,
  X as XIcon,
  MessageSquare,
  Settings,
  User,
  Clock,
  Pencil,
  Trash2,
  Send,
  Sparkles,
  Bot,
  List,
  Tag,
  CheckCircle2,
  Circle,
  Check,
} from "lucide-react";

// --- MOCK CONTEXT & HELPERS (for standalone demonstration) ---
const StandaloneContext = createContext();
const useStandaloneContext = () => useContext(StandaloneContext);

const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("/pinterest-automation");
  const value = { activePage, setActivePage };
  return (
    <StandaloneContext.Provider value={value}>
      {children}
    </StandaloneContext.Provider>
  );
};

// --- REUSABLE UI COMPONENTS (from your theme) ---

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

// Custom Pinterest Icon as SVG since it's not in lucide-react
const PinterestIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.633 7.855 6.356 9.312-.084-.399-.02-1.01.23-1.48C8.83 19.34 9.5 18.5 9.5 17.5c0-1.12-.66-2.31-1.5-2.31-.76 0-1.28.57-1.28 1.28 0 .47.33.98.5 1.28.17.3.17.65 0 .95-.17.3-.47.6-.74.6-.9 0-1.58-1.12-1.58-2.65 0-2.13 1.5-3.87 3.42-3.87 1.8 0 2.87 1.33 2.87 2.75 0 1.65-.9 3.25-2.25 3.25-.47 0-.9-.28-.9-.63 0-.5.33-1 .47-1.4.17-.47.5-1 .5-1.48 0-.7-.28-1.28-.84-1.28-.65 0-1.13.7-1.13 1.58 0 .47.1 1 .28 1.4L12 18.5c.33 1.48 2.13 2.5 3.87 2.5 2.13 0 3.87-2.13 3.87-4.75 0-2.4-1.48-4.25-4.25-4.25-2.87 0-4.75 2.13-4.75 4.75 0 .7.28 1.4.5 1.88.28.47.33.98.28 1.48l-.28 1.12c-.1.47-.03.98.14 1.4.17.4.47.78.84 1.05.7.55 1.58.84 2.5.84 3.42 0 6.35-2.87 6.35-6.35C22 6.477 17.523 2 12 2z" />
  </svg>
);

// --- PINTEREST DASHBOARD COMPONENTS ---

const PinEditorModal = ({ isOpen, onClose, onSave, pin }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [board, setBoard] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");

  useEffect(() => {
    if (pin) {
      setTitle(pin.title);
      setDescription(pin.description);
      setLink(pin.link);
      setBoard(pin.board);
      setImagePreview(pin.imageUrl);
      setScheduleDate(pin.date.toISOString().slice(0, 16));
    } else {
      setTitle("");
      setDescription("");
      setLink("");
      setBoard("");
      setImagePreview(null);
      setScheduleDate("");
    }
  }, [pin, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSave = () => {
    onSave({
      id: pin?.id || Date.now(),
      title,
      description,
      link,
      board,
      imageUrl: imagePreview,
      date: new Date(scheduleDate),
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isOpen ? "bg-black/40" : "bg-transparent pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-dotted border-black bg-white">
          <h3 className="text-xl font-bold">
            {pin ? "Edit Pin" : "Schedule a Pin"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto flex-grow">
          <div className="relative w-full h-48 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center bg-zinc-100 overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-12 w-12 text-zinc-400" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Board</label>
            <input
              type="text"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              placeholder="e.g., 'Summer Recipes'"
              className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title"
              className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tell everyone what your Pin is about"
              className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Add a destination link"
              className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Schedule Date & Time</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg"
            />
          </div>
        </div>
        <div className="p-4 bg-white border-t border-dotted border-black">
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 font-bold"
          >
            Save Pin
          </button>
        </div>
      </div>
    </div>
  );
};

const PinCard = ({ pin, onEdit, onDelete }) => (
  <div className="group relative break-inside-avoid">
    <img
      src={pin.imageUrl}
      alt={pin.title}
      className="w-full rounded-lg shadow-sm"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-end p-4">
      <p className="text-white font-bold text-sm line-clamp-2">{pin.title}</p>
      <div className="text-xs text-zinc-200 flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        <span>{pin.date.toLocaleDateString()}</span>
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(pin)}
          className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Pencil className="w-4 h-4 text-black" />
        </button>
        <button
          onClick={() => onDelete(pin.id)}
          className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Trash2 className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  </div>
);

const PinScheduler = () => {
  const [pins, setPins] = useState([
    {
      id: 1,
      title: "Grilled Summer Skewers",
      description: "Easy and delicious skewers for your next BBQ.",
      link: "https://example.com/skewers",
      board: "Summer Recipes",
      imageUrl: "https://placehold.co/600x900/000000/FFFFFF?text=Pin+1",
      date: new Date(Date.now() + 86400000 * 2),
    },
    {
      id: 2,
      title: "DIY Patio Furniture",
      description: "Upgrade your outdoor space with this simple DIY project.",
      link: "https://example.com/patio",
      board: "Home Decor",
      imageUrl: "https://placehold.co/600x750/31343C/FFFFFF?text=Pin+2",
      date: new Date(Date.now() + 86400000 * 5),
    },
    {
      id: 3,
      title: "Refreshing Watermelon Smoothie",
      description: "The perfect drink for a hot day.",
      link: "https://example.com/smoothie",
      board: "Summer Recipes",
      imageUrl: "https://placehold.co/600x800/929497/FFFFFF?text=Pin+3",
      date: new Date(Date.now() + 86400000 * 7),
    },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPin, setEditingPin] = useState(null);

  const handleSavePin = (pinData) => {
    const existingIndex = pins.findIndex((p) => p.id === pinData.id);
    if (existingIndex > -1) {
      const updatedPins = [...pins];
      updatedPins[existingIndex] = pinData;
      setPins(updatedPins);
    } else {
      setPins((prev) => [...prev, pinData]);
    }
  };
  const handleEdit = (pin) => {
    setEditingPin(pin);
    setIsEditorOpen(true);
  };
  const handleNew = () => {
    setEditingPin(null);
    setIsEditorOpen(true);
  };
  const handleDelete = (id) => setPins(pins.filter((p) => p.id !== id));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Scheduled Pins</h3>
        <button
          onClick={handleNew}
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" /> Schedule Pin
        </button>
      </div>
      {pins.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {pins
            .sort((a, b) => a.date - b.date)
            .map((pin) => (
              <PinCard
                key={pin.id}
                pin={pin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
      ) : (
        <Card className="text-center py-12 border-2 border-dashed">
          <p className="text-zinc-500">
            No Pins scheduled. Click "Schedule Pin" to get started.
          </p>
        </Card>
      )}
      <PinEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSavePin}
        pin={editingPin}
      />
    </div>
  );
};

const CommentRuleEditorPanel = ({ isOpen, rule, onSave, onClose }) => {
  const [name, setName] = useState("");
  const [pinSelection, setPinSelection] = useState("all");
  const [selectedPinIds, setSelectedPinIds] = useState([]);
  const [triggerType, setTriggerType] = useState("all_comments");
  const [triggerKeywords, setTriggerKeywords] = useState("");
  const [replies, setReplies] = useState([""]);
  useEffect(() => {
    setName(rule?.name || "New Rule");
    setPinSelection(rule?.pinSelection || "all");
    setSelectedPinIds(rule?.selectedPinIds || []);
    setTriggerType(rule?.triggerType || "all_comments");
    setTriggerKeywords(rule?.triggerKeywords?.join(", ") || "");
    setReplies(rule?.replies?.length ? rule.replies : [""]);
  }, [rule, isOpen]);
  const handleSave = () => {
    onSave({
      id: rule?.id || Date.now(),
      name,
      pinSelection,
      selectedPinIds,
      triggerType,
      triggerKeywords: triggerKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      replies: replies.filter(Boolean),
      isActive: rule?.isActive ?? true,
    });
  };
  const togglePinSelection = (pinId) =>
    setSelectedPinIds((prev) =>
      prev.includes(pinId)
        ? prev.filter((id) => id !== pinId)
        : [...prev, pinId]
    );
  const handleReplyChange = (index, value) => {
    const newReplies = [...replies];
    newReplies[index] = value;
    setReplies(newReplies);
  };
  const addReply = () => setReplies([...replies, ""]);
  const removeReply = (index) =>
    setReplies(replies.filter((_, i) => i !== index));
  const mockPins = Array.from({ length: 8 }, (_, i) => ({
    id: 201 + i,
    imageUrl: `https://placehold.co/400x600/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/FFFFFF?text=Pin+${i + 1}`,
  }));

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isOpen ? "bg-black/40" : "bg-transparent pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-dotted border-black bg-white">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl font-bold bg-transparent focus:outline-none focus:ring-0 w-full"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">1. Select Pins</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setPinSelection("all")}
                className={`flex-1 p-3 rounded-lg border border-dotted ${
                  pinSelection === "all"
                    ? "bg-zinc-100 border-black"
                    : "border-zinc-300"
                }`}
              >
                All Pins
              </button>
              <button
                onClick={() => setPinSelection("specific")}
                className={`flex-1 p-3 rounded-lg border border-dotted ${
                  pinSelection === "specific"
                    ? "bg-zinc-100 border-black"
                    : "border-zinc-300"
                }`}
              >
                Specific Pins
              </button>
            </div>
            {pinSelection === "specific" && (
              <div className="grid grid-cols-4 gap-3 max-h-52 overflow-y-auto p-2 bg-white rounded-lg border border-dotted">
                {mockPins.map((pin) => (
                  <div
                    key={pin.id}
                    onClick={() => togglePinSelection(pin.id)}
                    className="relative cursor-pointer aspect-[2/3] group"
                  >
                    <img
                      src={pin.imageUrl}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div
                      className={`absolute inset-0 bg-black transition-opacity rounded-md ${
                        selectedPinIds.includes(pin.id)
                          ? "opacity-40"
                          : "opacity-0 group-hover:opacity-20"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPinIds.includes(pin.id)
                          ? "bg-black border-black text-white"
                          : "bg-white/50 border-white"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">2. Set Trigger</h3>
            <div className="flex gap-4">
              <div
                onClick={() => setTriggerType("all_comments")}
                className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 bg-white"
              >
                {triggerType === "all_comments" ? (
                  <CheckCircle2 className="w-6 h-6 text-black mt-0.5" />
                ) : (
                  <Circle className="w-6 h-6 text-zinc-400 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold">All Comments</h4>
                  <p className="text-sm text-zinc-600">
                    Reply to every comment.
                  </p>
                </div>
              </div>
              <div
                onClick={() => setTriggerType("specific_keywords")}
                className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 bg-white"
              >
                {triggerType === "specific_keywords" ? (
                  <CheckCircle2 className="w-6 h-6 text-black mt-0.5" />
                ) : (
                  <Circle className="w-6 h-6 text-zinc-400 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold">Keywords</h4>
                  <p className="text-sm text-zinc-600">
                    Only reply to specific words.
                  </p>
                </div>
              </div>
            </div>
            {triggerType === "specific_keywords" && (
              <div className="pt-2">
                <input
                  type="text"
                  value={triggerKeywords}
                  onChange={(e) => setTriggerKeywords(e.target.value)}
                  className="w-full p-2 bg-white border border-dotted rounded-lg"
                  placeholder="e.g. love this, how to, inspiration"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">3. Add Replies</h3>
            <p className="text-sm text-zinc-600">
              Add multiple variations. One will be chosen at random.
            </p>
            <div className="space-y-3">
              {replies.map((reply, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                    className="flex-grow p-2 bg-white border border-dotted rounded-lg"
                    placeholder={`Reply #${index + 1}`}
                  />
                  <button
                    onClick={() => removeReply(index)}
                    className="p-2 text-zinc-500 hover:text-red-500 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addReply}
                className="mt-2 px-3 py-1.5 border border-black rounded-lg flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Add reply
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-dotted border-black">
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-black text-white rounded-lg font-bold"
          >
            Save Rule
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentAutomator = ({ rules, setRules }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const handleSaveRule = (ruleData) => {
    const existingIndex = rules.findIndex((r) => r.id === ruleData.id);
    if (existingIndex > -1) {
      const updatedRules = [...rules];
      updatedRules[existingIndex] = ruleData;
      setRules(updatedRules);
    } else {
      setRules([...rules, ruleData]);
    }
    setIsPanelOpen(false);
    setEditingRule(null);
  };
  const handleNewRule = () => {
    setEditingRule(null);
    setIsPanelOpen(true);
  };
  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setIsPanelOpen(true);
  };
  const handleDeleteRule = (id) => setRules(rules.filter((r) => r.id !== id));
  const toggleRuleStatus = (id) =>
    setRules(
      rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Comment Automation Rules</h3>
        <button
          onClick={handleNewRule}
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" /> New Rule
        </button>
      </div>
      <div className="space-y-4">
        {rules.length > 0 ? (
          rules.map((rule) => (
            <Card
              key={rule.id}
              className="!p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-grow">
                <h4 className="font-bold">{rule.name}</h4>
                <div className="flex items-center gap-4 text-sm text-zinc-600 mt-1 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <List className="w-4 h-4" />{" "}
                    {rule.pinSelection === "specific"
                      ? `${rule.selectedPinIds.length} Pins`
                      : "All Pins"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />{" "}
                    {rule.triggerType === "specific_keywords"
                      ? `${rule.triggerKeywords.length} Keywords`
                      : "All Comments"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.isActive}
                    onChange={() => toggleRuleStatus(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
                <button
                  onClick={() => handleEditRule(rule)}
                  className="px-3 py-1 border border-black rounded-md text-sm hover:bg-zinc-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12 border-2 border-dashed">
            <p className="text-zinc-500">
              No comment automation rules created yet.
            </p>
          </Card>
        )}
      </div>
      <CommentRuleEditorPanel
        isOpen={isPanelOpen}
        rule={editingRule}
        onSave={handleSaveRule}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const PinterestDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Pin Scheduler");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [rules, setRules] = useState([]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col h-full">
        <SectionHeader icon={PinterestIcon} title="Pinterest Automation" />
        <Card className="flex-grow flex flex-col items-center justify-center text-center border-2 border-dashed bg-zinc-50">
          <PinterestIcon className="w-16 h-16 text-zinc-400 mb-4" />
          <h3 className="text-2xl font-bold">Connect your Pinterest Account</h3>
          <p className="text-zinc-600 mt-2 max-w-sm">
            To get started with scheduling pins and automating comments, you
            first need to connect your Pinterest account.
          </p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors"
          >
            {isConnecting ? (
              <Clock className="w-5 h-5 animate-spin" />
            ) : (
              <LinkIcon className="w-5 h-5" />
            )}
            {isConnecting ? "Connecting..." : "Connect to Pinterest"}
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SectionHeader icon={PinterestIcon} title="Pinterest Automation" />
      <div className="border-b border-dotted border-black mb-6">
        <nav className="flex gap-4 overflow-x-auto">
          {["Pin Scheduler", "Comment Automation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {activeTab === "Pin Scheduler" && <PinScheduler />}
        {activeTab === "Comment Automation" && (
          <CommentAutomator rules={rules} setRules={setRules} />
        )}
      </div>
    </div>
  );
};

// --- Main App Component (for demonstration) ---
export default function App() {
  return (
    <AppProvider>
      <div
        className="p-2 sm:p-6 bg-zinc-50 font-sans text-black"
        style={{ minHeight: "90vh" }}
      >
        <PinterestDashboardPage />
      </div>
    </AppProvider>
  );
}
