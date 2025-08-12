"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Twitter, Calendar, Send, MessageSquare, BarChart2, User, LogOut, 
  Plus, Trash2, Edit, Search, UserPlus
} from 'lucide-react';

// --- Reusable UI Components ---

const Card = ({ children, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl shadow-sm ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const ToggleSwitch = ({ enabled, setEnabled }) => {
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`flex items-center w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
        enabled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className={`w-5 h-5 rounded-full shadow-md ml-1 ${
          enabled ? 'bg-white dark:bg-slate-900' : 'bg-white'
        }`}
      />
    </div>
  );
};

// --- Main Feature Views ---

const ScheduleView = ({ posts, setPosts, newPost, setNewPost, editingPostId, setEditingPostId }) => {
  const handleSchedulePost = () => {
    // Note: In a real app, date validation should be more robust.
    // The current date is August 11, 2025.
    if (!newPost.content || !newPost.date || !newPost.time) return;
    if (editingPostId) {
      setPosts(posts.map(p => p.id === editingPostId ? { ...p, ...newPost } : p));
    } else {
      setPosts([...posts, { ...newPost, id: Date.now(), status: 'scheduled' }]);
    }
    setNewPost({ content: '', date: '', time: '' });
    setEditingPostId(null);
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setNewPost({ content: post.content, date: post.date, time: post.time });
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setNewPost({ content: '', date: '', time: '' });
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          {editingPostId ? 'Edit Tweet' : 'Schedule a Tweet'}
        </h2>
        <textarea
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          placeholder="What do you want to talk about?"
          className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none transition-shadow"
          rows={4}
        />
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <input
            type="date"
            value={newPost.date}
            onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none"
          />
          <input
            type="time"
            value={newPost.time}
            onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none"
          />
        </div>
        <div className="flex justify-end items-center gap-3">
          {editingPostId && (
            <button onClick={cancelEditing} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Cancel
            </button>
          )}
          <button onClick={handleSchedulePost} className="px-5 py-2 text-sm font-semibold text-white dark:text-black bg-slate-900 dark:bg-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-300 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Calendar size={16} />
            {editingPostId ? 'Update Tweet' : 'Schedule'}
          </button>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Scheduled Queue</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {posts.length > 0 ? (
              posts.map(post => (
                <Card key={post.id} className="p-5 flex justify-between items-start" layout>
                  <div>
                    <p className="text-slate-700 dark:text-slate-200 mb-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{post.date} at {post.time}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        post.status === 'scheduled' 
                        ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600'
                      }`}>{post.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEditing(post)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"><Edit size={16}/></button>
                    <button onClick={() => deletePost(post.id)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"><Trash2 size={16}/></button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                <Calendar size={40} className="mx-auto text-slate-400 dark:text-slate-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">Queue is empty</h3>
                <p className="text-slate-500 dark:text-slate-400">Schedule a tweet to see it here.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DmView = ({ automationEnabled, setAutomationEnabled, message, setMessage }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Welcome DM Automation</h2>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold ${automationEnabled ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            {automationEnabled ? 'Active' : 'Inactive'}
          </span>
          <ToggleSwitch enabled={automationEnabled} setEnabled={setAutomationEnabled} />
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Automatically send a direct message to every new follower.</p>
      
      <AnimatePresence>
        {automationEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Welcome Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Hey! Thanks for the follow. Here is a link to our best content..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none transition-shadow"
              rows={4}
            />
            <div className="flex justify-end mt-4">
              <button className="px-5 py-2 text-sm font-semibold text-white dark:text-black bg-slate-900 dark:bg-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-300 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all shadow-sm hover:shadow-md">
                Save Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const RepliesView = ({ automationEnabled, setAutomationEnabled, replies, setReplies }) => {
    const [newReply, setNewReply] = useState({ trigger: '', response: '' });
    const [editingId, setEditingId] = useState(null);

    const handleSaveReply = () => {
        if (!newReply.trigger || !newReply.response) return;

        if (editingId) {
            setReplies(replies.map(r => r.id === editingId ? { ...r, ...newReply } : r));
        } else {
            setReplies([...replies, { ...newReply, id: Date.now() }]);
        }
        setNewReply({ trigger: '', response: '' });
        setEditingId(null);
    };

    const startEditing = (reply) => {
        setEditingId(reply.id);
        setNewReply({ trigger: reply.trigger, response: reply.response });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setNewReply({ trigger: '', response: '' });
    };
    
    const deleteReply = (id) => {
        setReplies(replies.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">AI Replies Automation</h2>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold ${automationEnabled ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                            {automationEnabled ? 'Active' : 'Inactive'}
                        </span>
                        <ToggleSwitch enabled={automationEnabled} setEnabled={setAutomationEnabled} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Automatically reply to tweets that contain specific keywords or phrases.</p>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                    {editingId ? 'Edit Reply' : 'Add New Automated Reply'}
                </h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={newReply.trigger}
                        onChange={(e) => setNewReply({ ...newReply, trigger: e.target.value })}
                        placeholder="Trigger keyword (e.g., 'best tools')"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none"
                    />
                    <textarea
                        value={newReply.response}
                        onChange={(e) => setNewReply({ ...newReply, response: e.target.value })}
                        placeholder="Automated response text"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end items-center gap-3 mt-4">
                    {editingId && (
                        <button onClick={cancelEditing} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                            Cancel
                        </button>
                    )}
                    <button onClick={handleSaveReply} className="px-5 py-2 text-sm font-semibold text-white dark:text-black bg-slate-900 dark:bg-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-300 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                        <Plus size={16} />
                        {editingId ? 'Update Reply' : 'Add Reply'}
                    </button>
                </div>
            </Card>

            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Active Replies</h2>
                <div className="space-y-4">
                  {replies.map(reply => (
                      <Card key={reply.id} className="p-5">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">If a tweet contains:</p>
                                  <p className="font-semibold text-slate-800 dark:text-slate-100 my-1">"{reply.trigger}"</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Reply with:</p>
                                  <p className="text-slate-700 dark:text-slate-200 mt-1">{reply.response}</p>
                              </div>
                              <div className="flex gap-1">
                                <button onClick={() => startEditing(reply)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"><Edit size={16}/></button>
                                <button onClick={() => deleteReply(reply.id)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"><Trash2 size={16}/></button>
                              </div>
                          </div>
                      </Card>
                  ))}
                </div>
            </div>
        </div>
    );
};

// --- Login Screen ---
const LoginScreen = ({ handleLogin }) => {
  const features = [
    { icon: Calendar, text: 'Smart Scheduling' },
    { icon: Send, text: 'Auto DMs' },
    { icon: MessageSquare, text: 'AI Replies' },
    { icon: BarChart2, text: 'Advanced Analytics' },
    { icon: UserPlus, text: 'Follower Growth' },
    { icon: Search, text: 'Keyword Monitoring' }
  ];

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl w-full text-center p-8"
      >
        <div className="inline-block bg-slate-200 dark:bg-slate-800 p-5 rounded-full mb-6">
          <Twitter className="h-12 w-12 text-slate-900 dark:text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Supercharge Your Twitter
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-8">
          The all-in-one platform to schedule posts, automate engagement, and analyze your growth.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:bg-slate-700 dark:hover:bg-slate-300 transition-all text-lg flex items-center gap-3 mx-auto"
        >
          <Twitter size={20} />
          Connect with Twitter
        </motion.button>
        <div className="mt-16">
          <h3 className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-6">Powerful Features Included</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/50 shadow-sm"
              >
                <feature.icon className="h-7 w-7 text-slate-800 dark:text-white mb-3" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


// --- Sidebar / Navigation ---
const Sidebar = ({ accountInfo, handleLogout, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'dm', icon: Send, label: 'DM Automations' },
    { id: 'replies', icon: MessageSquare, label: 'Replies Automations' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  ];

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col p-4">
      <div className="flex items-center gap-3 p-3 mb-6">
        <div className="bg-black dark:bg-white p-2 rounded-lg">
          <Twitter className="h-6 w-6 text-white dark:text-black" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Automator</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={accountInfo.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-slate-800 dark:text-white">{accountInfo.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{accountInfo.username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}


// --- Main App Component ---
const TwitterDashboard = () => {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');
  
  // Schedule State
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '', date: '', time: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  // DM State
  const [dmAutomationEnabled, setDmAutomationEnabled] = useState(false);
  const [dmMessage, setDmMessage] = useState('Hey, thanks for following! I share tips on growth and marketing. Happy to have you here!');
  
  // Replies State
  const [repliesAutomationEnabled, setRepliesAutomationEnabled] = useState(false);
  const [replies, setReplies] = useState([]);

  // Mock data setup
  const setupMockData = () => {
    setAccountInfo({
      username: '@social_automator',
      name: 'Social Automator',
      followers: '12.4K',
      following: '1.2K',
      tweets: '4,829',
      profilePic: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80'
    });
    setScheduledPosts([
      { id: 1, content: 'A minimal design system helps users focus on what\'s truly important: the content. #Design #Minimalism', date: '2025-08-12', time: '14:30', status: 'scheduled' },
      { id: 2, content: 'Productivity hack: Use a monochromatic color scheme to reduce decision fatigue. ⚫️⚪️', date: '2025-08-13', time: '09:00', status: 'scheduled' },
      { id: 3, content: 'Drafting out ideas for a new analytics dashboard. What are the key metrics you track?', date: '2025-08-15', time: '11:00', status: 'draft' },
    ]);
    setReplies([
      { id: 1, trigger: 'recommend a tool', response: 'You should check us out! We help automate Twitter growth.' },
      { id: 2, trigger: 'design tips', response: 'We believe in minimalism! Focus on typography and spacing.' }
    ]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setupMockData();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccountInfo(null);
    setScheduledPosts([]);
    setReplies([]);
  };

  if (!isLoggedIn) {
    return <div className="bg-white dark:bg-slate-900"><LoginScreen handleLogin={handleLogin} /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-200">
      <Sidebar 
        accountInfo={accountInfo}
        handleLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="ml-64 p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'schedule' && (
            <ScheduleView 
              posts={scheduledPosts}
              setPosts={setScheduledPosts}
              newPost={newPost}
              setNewPost={setNewPost}
              editingPostId={editingPostId}
              setEditingPostId={setEditingPostId}
            />
          )}
          {activeTab === 'dm' && (
             <DmView 
               automationEnabled={dmAutomationEnabled}
               setAutomationEnabled={setDmAutomationEnabled}
               message={dmMessage}
               setMessage={setDmMessage}
             />
          )}
          {activeTab === 'replies' && (
             <RepliesView
                automationEnabled={repliesAutomationEnabled}
                setAutomationEnabled={setRepliesAutomationEnabled}
                replies={replies}
                setReplies={setReplies}
             />
          )}
          {activeTab === 'analytics' && (
            <Card className="p-6 text-center">
              <BarChart2 size={48} className="mx-auto text-slate-400 mb-4" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Analytics</h2>
              <p className="text-slate-500 dark:text-slate-400">This feature is coming soon!</p>
            </Card>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TwitterDashboard;