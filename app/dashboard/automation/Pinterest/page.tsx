"use client";

import React, { useEffect, useMemo, useState } from "react";

/*************************************************
 * Pinterest Automation Dashboard (Production Ready)
 * - Clean, professional UI with modern design principles
 * - TypeScript with proper type definitions
 * - Responsive design for all screen sizes
 * - Accessible with proper ARIA labels
 * - Maintains pink/purple gradient theme
 *************************************************/

/******************** Types ********************/
interface PinItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  board?: string;
  imageUrl?: string;
  scheduledAt?: string; // ISO string (yyyy-MM-ddTHH:mm)
  createdAt: string; // ISO
}

type TriggerType = "all_comments" | "specific_keywords";

interface CommentRule {
  id: string;
  name: string;
  pinScope: "all" | "specific";
  pinIds: string[];
  trigger: TriggerType;
  keywords: string[]; // only used when trigger === "specific_keywords"
  replies: string[]; // at least 1
  isActive: boolean;
  createdAt: string;
}

/******************** Utility Functions ********************/
const uid = () => Math.random().toString(36).slice(2, 10);
const nowIso = () => new Date().toISOString();

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/******************** UI Components ********************/
const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-lg focus:ring-pink-500",
    secondary:
      "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-gray-400 shadow-sm",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
    danger:
      "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ className, label, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
    )}
    <input
      className={cx(
        "w-full rounded-lg border bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-colors duration-200",
        error ? "border-red-300" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  error,
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
    )}
    <textarea
      className={cx(
        "w-full rounded-lg border bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-colors duration-200 min-h-[100px]",
        error ? "border-red-300" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cx(
      "rounded-2xl bg-white p-6 shadow-sm border border-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SectionHeader: React.FC<{
  title: string;
  description?: string;
  right?: React.ReactNode;
}> = ({ title, description, right }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 w-2 h-6 rounded-full"></span>
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      )}
    </div>
    {right}
  </div>
);

/******************** Pinterest Connect Component ********************/
const ConnectPinterest: React.FC<{ onConnected: () => void }> = ({
  onConnected,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 p-4">
      <Card className="max-w-md w-full text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <svg
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pinterest Automation
        </h1>
        <p className="text-gray-600 mb-6">
          Connect your Pinterest account to start scheduling pins and
          auto‑replying to comments.
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                onConnected();
                setIsLoading(false);
              }, 1200);
            }}
            isLoading={isLoading}
            className="w-full"
          >
            Connect Pinterest
          </Button>
          <Button variant="ghost" onClick={() => location.reload()}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

/******************** Modal Components ********************/
const Backdrop: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cx("fixed inset-0 z-40 bg-black/40 backdrop-blur-sm", className)}
    {...props}
  />
);

const SlideOver: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cx(
      "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/******************** Pin Editor Component ********************/
interface PinEditorProps {
  open: boolean;
  onClose: () => void;
  initial?: Partial<PinItem> | null;
  onSave: (pin: PinItem) => void;
}

const PinEditor: React.FC<PinEditorProps> = ({
  open,
  onClose,
  initial,
  onSave,
}) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [board, setBoard] = useState(initial?.board ?? "");
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initial?.imageUrl
  );
  const [scheduledAt, setScheduledAt] = useState<string>(
    initial?.scheduledAt ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setLink(initial?.link ?? "");
    setBoard(initial?.board ?? "");
    setImageUrl(initial?.imageUrl);
    setScheduledAt(initial?.scheduledAt ?? "");
    setErrors({});
  }, [open, initial]);

  if (!open) return null;

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image must be less than 5MB" });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "File must be an image" });
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setErrors({ ...errors });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!board.trim()) {
      newErrors.board = "Board is required";
    }

    if (!imageUrl) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const id = initial?.id ?? uid();
    const pin: PinItem = {
      id,
      title: title.trim(),
      description: description.trim(),
      link: link.trim() || undefined,
      board: board.trim(),
      imageUrl,
      scheduledAt: scheduledAt || undefined,
      createdAt: initial?.createdAt ?? nowIso(),
    };

    onSave(pin);
    onClose();
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <SlideOver
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-editor-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h3
            id="pin-editor-title"
            className="text-lg font-semibold text-gray-800"
          >
            {initial?.id ? "Edit Pin" : "Schedule a Pin"}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close editor"
            size="sm"
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex h-[calc(100%-80px)] flex-col"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Image
              </label>
              <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-pink-400 transition-colors duration-200">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col h-full w-full items-center justify-center text-gray-400">
                    <i className="fas fa-image text-2xl mb-2"></i>
                    <span className="text-sm">Click to upload image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Upload pin image"
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            <Input
              label="Board"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              placeholder="e.g., Summer Recipes"
              error={errors.board}
            />

            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title"
              error={errors.title}
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell everyone what your Pin is about"
            />

            <Input
              label="Link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…"
            />

            <Input
              label="Schedule Date & Time"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-200 bg-white p-5">
            <Button type="submit" className="w-full">
              Save Pin
            </Button>
          </div>
        </form>
      </SlideOver>
    </>
  );
};

/******************** Pin Scheduler Component ********************/
const PinScheduler: React.FC = () => {
  const [pins, setPins] = useState<PinItem[]>(() =>
    load<PinItem[]>("pins", [])
  );
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<PinItem | null>(null);

  useEffect(() => save("pins", pins), [pins]);

  const sorted = useMemo(
    () =>
      [...pins].sort((a, b) =>
        (a.scheduledAt ?? "").localeCompare(b.scheduledAt ?? "")
      ),
    [pins]
  );

  const onSave = (pin: PinItem) => {
    setPins((prev) => {
      const idx = prev.findIndex((p) => p.id === pin.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = pin;
        return copy;
      }
      return [...prev, pin];
    });
  };

  const onDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this pin?")) {
      setPins((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <SectionHeader
        title="Pin Scheduler"
        description="Schedule your pins to be posted at optimal times"
        right={
          <Button
            onClick={() => {
              setEditing(null);
              setEditorOpen(true);
            }}
            aria-label="Schedule pin"
          >
            <i className="fas fa-plus mr-2"></i> Schedule Pin
          </Button>
        }
      />

      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((pin) => (
            <div key={pin.id} className="relative group">
              <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg">
                <img
                  src={
                    pin.imageUrl ||
                    `https://placehold.co/600x800/111/FFF?text=${encodeURIComponent(
                      pin.title || "Pin"
                    )}`
                  }
                  alt={pin.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {pin.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {pin.description}
                  </p>

                  {pin.scheduledAt && (
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <i className="fas fa-clock mr-2"></i>
                      <span>{new Date(pin.scheduledAt).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {pin.board}
                    </span>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditing(pin);
                          setEditorOpen(true);
                        }}
                        aria-label="Edit pin"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(pin.id)}
                        aria-label="Delete pin"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <i className="fas fa-image text-gray-400 text-2xl"></i>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">No pins scheduled</h3>
          <p className="text-gray-600 mb-4">
            Get started by scheduling your first pin
          </p>
          <Button onClick={() => setEditorOpen(true)}>
            <i className="fas fa-plus mr-2"></i> Schedule Pin
          </Button>
        </Card>
      )}

      <PinEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        initial={editing ?? undefined}
        onSave={onSave}
      />
    </div>
  );
};

/******************** Comment Rule Editor Component ********************/
interface RuleEditorProps {
  open: boolean;
  onClose: () => void;
  initial?: Partial<CommentRule> | null;
  onSave: (rule: CommentRule) => void;
  pinOptions: Array<{ id: string; imageUrl?: string; title: string }>;
}

const RuleEditor: React.FC<RuleEditorProps> = ({
  open,
  onClose,
  initial,
  onSave,
  pinOptions,
}) => {
  const [name, setName] = useState(initial?.name ?? "New Rule");
  const [pinScope, setPinScope] = useState<"all" | "specific">(
    initial?.pinScope ?? "all"
  );
  const [pinIds, setPinIds] = useState<string[]>(initial?.pinIds ?? []);
  const [trigger, setTrigger] = useState<TriggerType>(
    initial?.trigger ?? "all_comments"
  );
  const [keywords, setKeywords] = useState<string[]>(initial?.keywords ?? []);
  const [keywordInput, setKeywordInput] = useState("");
  const [replies, setReplies] = useState<string[]>(
    initial?.replies?.length ? initial.replies : [""]
  );

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "New Rule");
    setPinScope(initial?.pinScope ?? "all");
    setPinIds(initial?.pinIds ?? []);
    setTrigger(initial?.trigger ?? "all_comments");
    setKeywords(initial?.keywords ?? []);
    setReplies(initial?.replies?.length ? initial.replies : [""]);
  }, [open, initial]);

  if (!open) return null;

  const togglePin = (id: string) =>
    setPinIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const addKeyword = () => {
    const k = keywordInput.trim();
    if (!k) return;
    setKeywords((prev) => Array.from(new Set([...prev, k])));
    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const addReply = () => {
    setReplies((prev) => [...prev, ""]);
  };

  const updateReply = (index: number, value: string) => {
    setReplies((prev) => prev.map((r, i) => (i === index ? value : r)));
  };

  const removeReply = (index: number) => {
    setReplies((prev) => prev.filter((_, i) => i !== index));
  };

  const saveRule = () => {
    const rule: CommentRule = {
      id: initial?.id ?? uid(),
      name: name.trim() || "New Rule",
      pinScope,
      pinIds: pinScope === "all" ? [] : pinIds,
      trigger,
      keywords: trigger === "specific_keywords" ? keywords : [],
      replies: replies.map((r) => r.trim()).filter(Boolean),
      isActive: initial?.isActive ?? true,
      createdAt: initial?.createdAt ?? nowIso(),
    };
    onSave(rule);
    onClose();
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <SlideOver>
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent text-lg font-semibold text-gray-800 focus:outline-none"
            aria-label="Rule name"
          />
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close"
            size="sm"
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <div className="flex h-[calc(100%-80px)] flex-col overflow-y-auto p-5">
          {/* 1. Pin scope */}
          <SectionHeader title="Select Pins" />
          <div className="mb-4 flex gap-2">
            <Button
              variant={pinScope === "all" ? "primary" : "secondary"}
              onClick={() => setPinScope("all")}
              size="sm"
            >
              All Pins
            </Button>
            <Button
              variant={pinScope === "specific" ? "primary" : "secondary"}
              onClick={() => setPinScope("specific")}
              size="sm"
            >
              Specific Pins
            </Button>
          </div>

          {pinScope === "specific" && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Select pins to apply this rule to:
              </p>
              <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {pinOptions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePin(p.id)}
                    className={cx(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                      pinIds.includes(p.id)
                        ? "border-pink-500"
                        : "border-gray-200"
                    )}
                  >
                    <img
                      src={
                        p.imageUrl ||
                        `https://placehold.co/400x600/222/FFF?text=${encodeURIComponent(
                          p.title
                        )}`
                      }
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={cx(
                        "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity",
                        pinIds.includes(p.id) ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <i className="fas fa-check text-white text-lg"></i>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Trigger */}
          <SectionHeader title="Set Trigger" />
          <div className="mb-6 grid gap-3">
            <div
              className={cx(
                "p-4 border rounded-lg cursor-pointer transition-all",
                trigger === "all_comments"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setTrigger("all_comments")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cx(
                    "h-5 w-5 rounded-full border flex items-center justify-center mt-0.5",
                    trigger === "all_comments"
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "border-gray-300"
                  )}
                >
                  {trigger === "all_comments" && (
                    <i className="fas fa-check text-xs"></i>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">All Comments</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Reply to every comment on selected pins.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cx(
                "p-4 border rounded-lg cursor-pointer transition-all",
                trigger === "specific_keywords"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setTrigger("specific_keywords")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cx(
                    "h-5 w-5 rounded-full border flex items-center justify-center mt-0.5",
                    trigger === "specific_keywords"
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "border-gray-300"
                  )}
                >
                  {trigger === "specific_keywords" && (
                    <i className="fas fa-check text-xs"></i>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Keywords</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Only reply to comments containing specific keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {trigger === "specific_keywords" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Keywords
              </label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="e.g. love this, how to, great"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addKeyword())
                  }
                />
                <Button onClick={addKeyword} type="button">
                  Add
                </Button>
              </div>

              {keywords.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Keywords to trigger replies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((k) => (
                      <span
                        key={k}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
                      >
                        {k}
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => removeKeyword(k)}
                          aria-label={`Remove ${k}`}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Replies */}
          <SectionHeader title="Add Replies" />
          <p className="text-sm text-gray-600 mb-4">
            Add multiple reply variations. One will be chosen at random when
            triggered.
          </p>

          <div className="space-y-3 mb-6">
            {replies.map((reply, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Textarea
                  value={reply}
                  onChange={(e) => updateReply(idx, e.target.value)}
                  placeholder={`Reply variation #${idx + 1}`}
                />
                {replies.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReply(idx)}
                    aria-label="Remove reply"
                    className="mt-2"
                  >
                    <i className="fas fa-trash text-red-500"></i>
                  </Button>
                )}
              </div>
            ))}

            <Button variant="secondary" onClick={addReply} className="w-full">
              <i className="fas fa-plus mr-2"></i> Add another reply
            </Button>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <Button onClick={saveRule} className="w-full">
              Save Rule
            </Button>
          </div>
        </div>
      </SlideOver>
    </>
  );
};

/******************** Comment Automator Component ********************/
const CommentAutomator: React.FC<{ pins: PinItem[] }> = ({ pins }) => {
  const [rules, setRules] = useState<CommentRule[]>(() =>
    load<CommentRule[]>("rules", [])
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CommentRule | null>(null);

  useEffect(() => save("rules", rules), [rules]);

  const toggleActive = (id: string) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );

  const onSave = (rule: CommentRule) => {
    setRules((prev) => {
      const idx = prev.findIndex((r) => r.id === rule.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = rule;
        return clone;
      }
      return [...prev, rule];
    });
  };

  const onDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      setRules((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <SectionHeader
        title="Comment Automation"
        description="Set up rules to automatically reply to comments"
        right={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <i className="fas fa-plus mr-2"></i> New Rule
          </Button>
        }
      />

      {rules.length ? (
        <div className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id} className="transition-all hover:shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                    <span
                      className={cx(
                        "text-xs px-2 py-1 rounded-full",
                        rule.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {rule.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-image"></i>
                      {rule.pinScope === "all"
                        ? "All Pins"
                        : `${rule.pinIds.length} Pins`}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-bolt"></i>
                      {rule.trigger === "all_comments"
                        ? "All comments"
                        : `${rule.keywords.length} keywords`}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-reply"></i>
                      {rule.replies.length} replies
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                    <div className="relative inline-block w-10 h-5">
                      <input
                        type="checkbox"
                        checked={rule.isActive}
                        onChange={() => toggleActive(rule.id)}
                        className="opacity-0 w-0 h-0"
                      />
                      <span
                        className={cx(
                          "absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all",
                          rule.isActive ? "bg-pink-500" : "bg-gray-300"
                        )}
                      ></span>
                      <span
                        className={cx(
                          "absolute h-3.5 w-3.5 rounded-full bg-white transition-all top-0.75",
                          rule.isActive ? "left-5.5" : "left-0.5"
                        )}
                      ></span>
                    </div>
                    Active
                  </label>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditing(rule);
                      setOpen(true);
                    }}
                    aria-label="Edit rule"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(rule.id)}
                    aria-label="Delete rule"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <i className="fas fa-comments text-gray-400 text-2xl"></i>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">
            No automation rules
          </h3>
          <p className="text-gray-600 mb-4">
            Create rules to automatically reply to comments
          </p>
          <Button onClick={() => setOpen(true)}>
            <i className="fas fa-plus mr-2"></i> Create Rule
          </Button>
        </Card>
      )}

      <RuleEditor
        open={open}
        onClose={() => setOpen(false)}
        initial={editing ?? undefined}
        onSave={onSave}
        pinOptions={pins.map((p) => ({
          id: p.id,
          title: p.title,
          imageUrl: p.imageUrl,
        }))}
      />
    </div>
  );
};

/******************** Main Dashboard Component ********************/
const PinterestDashboardPage: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(() =>
    load("connected", false)
  );
  const [pins, setPins] = useState<PinItem[]>(() =>
    load<PinItem[]>("pins", [])
  );

  useEffect(() => save("connected", connected), [connected]);
  useEffect(() => save("pins", pins), [pins]);

  if (!connected)
    return <ConnectPinterest onConnected={() => setConnected(true)} />;
  console.log(setPins);
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 p-4">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Pinterest Automation
              </h1>
              <p className="text-sm text-gray-600">
                Schedule pins and automate comments
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setConnected(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Disconnect
          </Button>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 mx-auto mb-3">
              <i className="fas fa-image text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{pins.length}</h3>
            <p className="text-gray-600">Scheduled Pins</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mx-auto mb-3">
              <i className="fas fa-comments text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {load<CommentRule[]>("rules", []).length}
            </h3>
            <p className="text-gray-600">Automation Rules</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-3">
              <i className="fas fa-calendar text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {
                pins.filter(
                  (p) => p.scheduledAt && new Date(p.scheduledAt) > new Date()
                ).length
              }
            </h3>
            <p className="text-gray-600">Upcoming Posts</p>
          </Card>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <PinScheduler />
          </Card>
          <Card>
            <CommentAutomator pins={pins} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PinterestDashboardPage;
