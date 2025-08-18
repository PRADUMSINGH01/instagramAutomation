"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  Image as ImageIcon,
  X as XIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

// --- MOCK CONTEXT & HELPERS (for standalone demonstration) ---
const StandaloneContext = createContext();
const useStandaloneContext = () => useContext(StandaloneContext);

const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("/post-automation");
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

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div
        className={`bg-white rounded-xl border border-dotted border-black p-6 w-full ${sizeClasses[size]}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// --- POST SCHEDULER COMPONENTS ---

/**
 * @typedef {object} PostObject
 * @property {number} id
 * @property {Date} date
 * @property {string} caption
 * @property {string | null} imageUrl
 */

/**
 * A modal for creating or editing a post.
 * @param {{ isOpen: boolean, onClose: () => void, onSave: (post: Omit<PostObject, 'id'> | PostObject) => void, selectedDate: Date, existingPost?: PostObject }} props
 */
const PostEditorModal = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  existingPost,
}) => {
  const [caption, setCaption] = useState("");
  const [time, setTime] = useState("10:00");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (existingPost) {
      setCaption(existingPost.caption);
      setTime(existingPost.date.toTimeString().slice(0, 5));
      setImagePreview(existingPost.imageUrl);
    } else {
      // Reset form for new post
      setCaption("");
      setTime("10:00");
      setImagePreview(null);
    }
  }, [existingPost, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes] = time.split(":");
    const postDate = new Date(selectedDate);
    postDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const postData = {
      ...existingPost,
      id: existingPost ? existingPost.id : Date.now(),
      date: postDate,
      caption,
      imageUrl: imagePreview,
    };

    onSave(postData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        existingPost
          ? "Edit Post"
          : `Schedule for ${selectedDate.toLocaleDateString()}`
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative w-full h-48 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center bg-zinc-50 overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-zinc-500">
              <ImageIcon className="mx-auto h-12 w-12" />
              <p>Click to upload an image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-zinc-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 w-full p-2 border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
            placeholder="What's on your mind?"
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-zinc-700"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full p-2 border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-black rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {existingPost ? "Save Changes" : "Schedule Post"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

/**
 * A modal showing posts for a specific day.
 * @param {{ isOpen: boolean, onClose: () => void, date: Date, posts: PostObject[], onAddPost: () => void, onEditPost: (post: PostObject) => void, onDeletePost: (id: number) => void }} props
 */
const DayDetailModal = ({
  isOpen,
  onClose,
  date,
  posts,
  onAddPost,
  onEditPost,
  onDeletePost,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Scheduled for ${date.toLocaleDateString()}`}
      size="lg"
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {posts.length > 0 ? (
          posts
            .sort((a, b) => a.date - b.date)
            .map((post) => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-3 border border-dotted border-zinc-300 rounded-lg"
              >
                <img
                  src={
                    post.imageUrl ||
                    "https://placehold.co/100x100/EEE/31343C?text=No%20Image"
                  }
                  alt="Post preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <p className="font-bold text-zinc-600">
                    {post.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-zinc-800 line-clamp-3">
                    {post.caption}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onEditPost(post)}
                    className="px-3 py-1 border border-black rounded-md text-sm hover:bg-zinc-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="px-3 py-1 border border-transparent text-red-600 rounded-md text-sm hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-zinc-500 py-8">
            No posts scheduled for this day.
          </p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={onAddPost}
          className="w-full px-4 py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-5 h-5" /> Schedule a new post
        </button>
      </div>
    </Modal>
  );
};

// --- MAIN PAGE COMPONENT ---

const PostAutomationPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts, setPosts] = useState([
    {
      id: 1,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15,
        14,
        30
      ),
      caption: "Excited to share our new feature!",
      imageUrl: "https://placehold.co/600x400/000000/FFFFFF?text=Post+1",
    },
    {
      id: 2,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15,
        18,
        0
      ),
      caption: "Don't miss our evening update.",
      imageUrl: "https://placehold.co/600x400/31343C/FFFFFF?text=Post+2",
    },
    {
      id: 3,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 9, 0),
      caption: "A beautiful morning to start something new.",
      imageUrl: "https://placehold.co/600x400/929497/FFFFFF?text=Post+3",
    },
  ]);
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingPost, setEditingPost] = useState(null);

  const handleDayClick = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(date);
    setIsDayDetailOpen(true);
  };

  const handleSavePost = (postData) => {
    const existingIndex = posts.findIndex((p) => p.id === postData.id);
    if (existingIndex > -1) {
      const updatedPosts = [...posts];
      updatedPosts[existingIndex] = postData;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, postData]);
    }
    setIsEditorOpen(false);
    setEditingPost(null);
    setIsDayDetailOpen(true); // Re-open day detail to see the new/updated post
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleAddPostClick = () => {
    setIsDayDetailOpen(false);
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPostClick = (post) => {
    setIsDayDetailOpen(false);
    setEditingPost(post);
    setSelectedDate(post.date);
    setIsEditorOpen(true);
  };

  const postsByDate = posts.reduce((acc, post) => {
    const dateKey = post.date.toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(post);
    return acc;
  }, {});

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();
  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="border-r border-b border-dotted border-black"
      ></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toDateString();
    const isToday = new Date().toDateString() === dateKey;
    const postsForDay = postsByDate[dateKey];

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDayClick(day)}
        className="p-2 border-r border-b border-dotted border-black relative aspect-square flex flex-col cursor-pointer hover:bg-zinc-50 transition-colors"
      >
        <time
          className={`font-semibold ${
            isToday
              ? "bg-black text-white rounded-full w-7 h-7 flex items-center justify-center"
              : ""
          }`}
        >
          {day}
        </time>
        {postsForDay && (
          <div className="mt-auto flex gap-1">
            {postsForDay.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="w-2 h-2 bg-zinc-400 rounded-full"
              ></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SectionHeader icon={FileText} title="Post Automation">
        <button
          onClick={() => {
            setSelectedDate(new Date());
            handleAddPostClick();
          }}
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Schedule Post
        </button>
      </SectionHeader>

      <Card className="flex-grow !p-0 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-dotted border-black">
          <h3 className="font-bold text-lg">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
              className="p-2 rounded-lg hover:bg-zinc-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
              className="p-2 rounded-lg hover:bg-zinc-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center font-bold border-b border-dotted border-black">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 border-r border-dotted border-black hidden sm:block"
            >
              {day.slice(0, 3)}
            </div>
          ))}
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="p-2 border-r border-dotted border-black sm:hidden"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-grow">{calendarDays}</div>
      </Card>

      <DayDetailModal
        isOpen={isDayDetailOpen}
        onClose={() => setIsDayDetailOpen(false)}
        date={selectedDate}
        posts={postsByDate[selectedDate.toDateString()] || []}
        onAddPost={handleAddPostClick}
        onEditPost={handleEditPostClick}
        onDeletePost={handleDeletePost}
      />

      <PostEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        selectedDate={selectedDate}
        existingPost={editingPost}
      />
    </div>
  );
};

// --- Main App Component (for demonstration) ---
export default function POST_AUTOMATION() {
  return (
    <AppProvider>
      <div
        className="p-2 sm:p-6 bg-zinc-50 font-sans text-black"
        style={{ height: "90vh" }}
      >
        <PostAutomationPage />
      </div>
    </AppProvider>
  );
}
