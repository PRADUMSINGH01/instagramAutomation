"use client"
import React, { useState, useEffect, createContext, useContext, useRef, ChangeEvent, FormEvent } from 'react';
import {
  Plus, Calendar, Image as ImageIcon, Link as LinkIcon, X as XIcon, MessageSquare, Settings, User, Clock, Pencil, Trash2, Send, Sparkles, Bot, List, Tag, CheckCircle2, Circle, Check
} from 'lucide-react';

// --- MOCK CONTEXT & HELPERS (for standalone demonstration) ---
const StandaloneContext = createContext();
const useStandaloneContext = () => useContext(StandaloneContext);

const AppProvider = ({ children }) => {
    const [activePage, setActivePage] = useState('/linkedin-automation');
    const value = { activePage, setActivePage };
    return <StandaloneContext.Provider value={value}>{children}</StandaloneContext.Provider>;
}

// --- REUSABLE UI COMPONENTS (from your theme) ---

const Card = ({ children, className = '' }) => (
  <div className={`border border-dotted border-black rounded-xl bg-white p-6 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title, children }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <h2 className="text-2xl font-bold flex items-center gap-3">
      <Icon className="w-7 h-7 text-black" />
      {title}
    </h2>
    <div className="flex items-center gap-2">
        {children}
    </div>
  </div>
);

// Custom LinkedIn Icon as SVG
const LinkedinIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
);


// --- LINKEDIN DASHBOARD COMPONENTS ---

const PostEditorModal = ({ isOpen, onClose, onSave, post }) => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [scheduleDate, setScheduleDate] = useState('');

    useEffect(() => {
        if (post) {
            setText(post.text);
            setImagePreview(post.imageUrl);
            setScheduleDate(post.date.toISOString().slice(0, 16));
        } else {
            setText(''); setImagePreview(null); setScheduleDate('');
        }
    }, [post, isOpen]);

    const handleImageChange = (e) => { if (e.target.files?.[0]) { setImagePreview(URL.createObjectURL(e.target.files[0])); } };
    const handleSave = () => { onSave({ id: post?.id || Date.now(), text, imageUrl: imagePreview, date: new Date(scheduleDate) }); onClose(); };

    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'bg-black/40' : 'bg-transparent pointer-events-none'}`} onClick={onClose}>
            <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-dotted border-black bg-white"><h3 className="text-xl font-bold">{post ? 'Edit Post' : 'Schedule a Post'}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100"><XIcon className="w-5 h-5" /></button></div>
                <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                    <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="What do you want to talk about?" className="w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg" />
                    <div className="relative w-full h-48 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center bg-zinc-100 overflow-hidden">{imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-12 w-12 text-zinc-400" />}<input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /></div>
                    <div><label className="text-sm font-medium">Schedule Date & Time</label><input type="datetime-local" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="mt-1 w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg" /></div>
                </div>
                <div className="p-4 bg-white border-t border-dotted border-black"><button onClick={handleSave} className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 font-bold">Save Post</button></div>
            </div>
        </div>
    );
};

const PostScheduler = () => {
    const [posts, setPosts] = useState([
        { id: 1, text: 'Excited to announce our Q3 results! A big thank you to the entire team for their hard work.', imageUrl: 'https://placehold.co/1200x628/000000/FFFFFF?text=Q3+Results', date: new Date(Date.now() + 86400000 * 3) },
        { id: 2, text: 'Looking for a talented project manager to join our growing team. #hiring #projectmanagement', imageUrl: null, date: new Date(Date.now() + 86400000 * 6) },
    ]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const handleSavePost = (postData) => { const existingIndex = posts.findIndex(p => p.id === postData.id); if (existingIndex > -1) { const updatedPosts = [...posts]; updatedPosts[existingIndex] = postData; setPosts(updatedPosts); } else { setPosts(prev => [...prev, postData]); } };
    const handleEdit = (post) => { setEditingPost(post); setIsEditorOpen(true); };
    const handleNew = () => { setEditingPost(null); setIsEditorOpen(true); };
    const handleDelete = (id) => setPosts(posts.filter(p => p.id !== id));

    return (
        <div>
            <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-xl">Scheduled Posts</h3><button onClick={handleNew} className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800"><Plus className="w-4 h-4" /> Schedule Post</button></div>
            <Card>
                <div className="space-y-4">
                    {posts.length > 0 ? posts.sort((a,b) => a.date - b.date).map(post => (
                        <div key={post.id} className="flex items-start gap-4 p-3 border border-dotted border-zinc-300 rounded-lg">
                            {post.imageUrl && <img src={post.imageUrl} alt="Post image" className="w-28 h-28 object-cover rounded-md flex-shrink-0" />}
                            <div className="flex-grow">
                                <p className="text-sm text-zinc-800 line-clamp-3">{post.text}</p>
                                <div className="mt-2 text-sm text-zinc-500 flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.date.toLocaleString()}</span></div>
                            </div>
                            <div className="flex flex-col gap-2"><button onClick={() => handleEdit(post)} className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full"><Pencil className="w-4 h-4" /></button><button onClick={() => handleDelete(post.id)} className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full"><Trash2 className="w-4 h-4" /></button></div>
                        </div>
                    )) : <p className="text-center text-zinc-500 py-8">No posts scheduled.</p>}
                </div>
            </Card>
            <PostEditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSavePost} post={editingPost} />
        </div>
    );
};

const AIAssistant = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedPost, setGeneratedPost] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIGeneration = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        setGeneratedPost('');
        const fullPrompt = `Generate a professional LinkedIn post about the following topic: "${prompt}". The post should be engaging, well-structured for a professional audience, and include relevant hashtags.`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: fullPrompt }] }];
            const payload = { contents: chatHistory };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.NEXT_GEMINI_API}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                setGeneratedPost(result.candidates[0].content.parts[0].text);
            } else {
                setGeneratedPost("Sorry, I couldn't generate a post for that topic. Please try again.");
            }
        } catch (error) {
            console.error("Error with Gemini API:", error);
            setGeneratedPost("An error occurred while generating the post. Please check the console.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="ai-prompt" className="text-lg font-bold flex items-center gap-2 mb-2">
                            <Bot className="w-6 h-6" />
                            AI Post Generator
                        </label>
                        <p className="text-sm text-zinc-600 mb-4">Enter a topic, idea, or keywords, and let AI craft a professional post for you.</p>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'the importance of company culture in remote teams'"
                            rows={3}
                            className="w-full p-2 text-lg border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black resize-none bg-transparent"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleAIGeneration} disabled={isGenerating || !prompt.trim()} className="px-6 py-2.5 font-bold text-white bg-black rounded-lg hover:bg-zinc-800 focus:outline-none disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                            {isGenerating ? <Clock className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                            {isGenerating ? 'Generating...' : 'Generate Post'}
                        </button>
                    </div>
                </div>
            </Card>

            {generatedPost && (
                <Card className="border-2 border-dashed">
                     <h3 className="font-bold text-zinc-600 mb-2">Generated Post:</h3>
                     <p className="whitespace-pre-wrap">{generatedPost}</p>
                </Card>
            )}
        </div>
    );
};

const CommentRuleEditorPanel = ({ isOpen, rule, onSave, onClose }) => {
    const [name, setName] = useState(''); const [postSelection, setPostSelection] = useState('all'); const [selectedPostIds, setSelectedPostIds] = useState([]); const [triggerType, setTriggerType] = useState('all_comments'); const [triggerKeywords, setTriggerKeywords] = useState(''); const [replies, setReplies] = useState(['']);
    useEffect(() => { setName(rule?.name || 'New Rule'); setPostSelection(rule?.postSelection || 'all'); setSelectedPostIds(rule?.selectedPostIds || []); setTriggerType(rule?.triggerType || 'all_comments'); setTriggerKeywords(rule?.triggerKeywords?.join(', ') || ''); setReplies(rule?.replies?.length ? rule.replies : ['']); }, [rule, isOpen]);
    const handleSave = () => { onSave({ id: rule?.id || Date.now(), name, postSelection, selectedPostIds, triggerType, triggerKeywords: triggerKeywords.split(',').map(k => k.trim()).filter(Boolean), replies: replies.filter(Boolean), isActive: rule?.isActive ?? true, }); };
    const togglePostSelection = (postId) => setSelectedPostIds(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
    const handleReplyChange = (index, value) => { const newReplies = [...replies]; newReplies[index] = value; setReplies(newReplies); };
    const addReply = () => setReplies([...replies, '']); const removeReply = (index) => setReplies(replies.filter((_, i) => i !== index));
    const mockPosts = Array.from({ length: 8 }, (_, i) => ({ id: 301 + i, imageUrl: `https://placehold.co/400x200/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Post+${i+1}` }));

    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'bg-black/40' : 'bg-transparent pointer-events-none'}`} onClick={onClose}>
            <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-dotted border-black bg-white"><input type="text" value={name} onChange={e => setName(e.target.value)} className="text-xl font-bold bg-transparent focus:outline-none focus:ring-0 w-full" /><button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100"><XIcon className="w-5 h-5" /></button></div>
                <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-2"><h3 className="text-lg font-bold">1. Select Posts</h3><div className="flex gap-2"><button onClick={() => setPostSelection('all')} className={`flex-1 p-3 rounded-lg border border-dotted ${postSelection === 'all' ? 'bg-zinc-100 border-black' : 'border-zinc-300'}`}>All Posts</button><button onClick={() => setPostSelection('specific')} className={`flex-1 p-3 rounded-lg border border-dotted ${postSelection === 'specific' ? 'bg-zinc-100 border-black' : 'border-zinc-300'}`}>Specific Posts</button></div>{postSelection === 'specific' && (<div className="grid grid-cols-4 gap-3 max-h-52 overflow-y-auto p-2 bg-white rounded-lg border border-dotted">{mockPosts.map(post => (<div key={post.id} onClick={() => togglePostSelection(post.id)} className="relative cursor-pointer aspect-video group"><img src={post.imageUrl} className="w-full h-full object-cover rounded-md" /><div className={`absolute inset-0 bg-black transition-opacity rounded-md ${selectedPostIds.includes(post.id) ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}></div><div className={`absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPostIds.includes(post.id) ? 'bg-black border-black text-white' : 'bg-white/50 border-white'}`}><Check className="w-3 h-3" /></div></div>))}</div>)}</div>
                    <div className="space-y-2"><h3 className="text-lg font-bold">2. Set Trigger</h3><div className="flex gap-4"><div onClick={() => setTriggerType('all_comments')} className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 bg-white">{triggerType === 'all_comments' ? <CheckCircle2 className="w-6 h-6 text-black mt-0.5" /> : <Circle className="w-6 h-6 text-zinc-400 mt-0.5" />}<div><h4 className="font-bold">All Comments</h4><p className="text-sm text-zinc-600">Reply to every comment.</p></div></div><div onClick={() => setTriggerType('specific_keywords')} className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 bg-white">{triggerType === 'specific_keywords' ? <CheckCircle2 className="w-6 h-6 text-black mt-0.5" /> : <Circle className="w-6 h-6 text-zinc-400 mt-0.5" />}<div><h4 className="font-bold">Keywords</h4><p className="text-sm text-zinc-600">Only reply to specific words.</p></div></div></div>{triggerType === 'specific_keywords' && (<div className="pt-2"><input type="text" value={triggerKeywords} onChange={e => setTriggerKeywords(e.target.value)} className="w-full p-2 bg-white border border-dotted rounded-lg" placeholder="e.g. congrats, hiring, interested" /></div>)}</div>
                    <div className="space-y-2"><h3 className="text-lg font-bold">3. Add Replies</h3><p className="text-sm text-zinc-600">Add multiple variations. One will be chosen at random.</p><div className="space-y-3">{replies.map((reply, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={reply} onChange={(e) => handleReplyChange(index, e.target.value)} className="flex-grow p-2 bg-white border border-dotted rounded-lg" placeholder={`Reply #${index + 1}`} /><button onClick={() => removeReply(index)} className="p-2 text-zinc-500 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button></div>))}<button onClick={addReply} className="mt-2 px-3 py-1.5 border border-black rounded-lg flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add reply</button></div></div>
                </div>
                <div className="p-4 bg-white border-t border-dotted border-black"><button onClick={handleSave} className="w-full px-4 py-3 bg-black text-white rounded-lg font-bold">Save Rule</button></div>
            </div>
        </div>
    );
};

const CommentAutomator = ({ rules, setRules }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);

    const handleSaveRule = (ruleData) => { const existingIndex = rules.findIndex(r => r.id === ruleData.id); if (existingIndex > -1) { const updatedRules = [...rules]; updatedRules[existingIndex] = ruleData; setRules(updatedRules); } else { setRules([...rules, ruleData]); } setIsPanelOpen(false); setEditingRule(null); };
    const handleNewRule = () => { setEditingRule(null); setIsPanelOpen(true); };
    const handleEditRule = (rule) => { setEditingRule(rule); setIsPanelOpen(true); };
    const handleDeleteRule = (id) => setRules(rules.filter(r => r.id !== id));
    const toggleRuleStatus = (id) => setRules(rules.map(r => r.id === id ? {...r, isActive: !r.isActive} : r));

    return (
        <div>
            <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-xl">Comment Automation Rules</h3><button onClick={handleNewRule} className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800"><Plus className="w-4 h-4" /> New Rule</button></div>
            <div className="space-y-4">
                {rules.length > 0 ? rules.map(rule => (
                    <Card key={rule.id} className="!p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-grow"><h4 className="font-bold">{rule.name}</h4><div className="flex items-center gap-4 text-sm text-zinc-600 mt-1 flex-wrap"><span className="flex items-center gap-1.5"><List className="w-4 h-4" /> {rule.postSelection === 'specific' ? `${rule.selectedPostIds.length} Posts` : 'All Posts'}</span><span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {rule.triggerType === 'specific_keywords' ? `${rule.triggerKeywords.length} Keywords` : 'All Comments'}</span></div></div>
                        <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                            <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={rule.isActive} onChange={() => toggleRuleStatus(rule.id)} className="sr-only peer" /><div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div></label>
                            <button onClick={() => handleEditRule(rule)} className="px-3 py-1 border border-black rounded-md text-sm hover:bg-zinc-100">Edit</button>
                            <button onClick={() => handleDeleteRule(rule.id)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 rounded-full"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </Card>
                )) : <Card className="text-center py-12 border-2 border-dashed"><p className="text-zinc-500">No comment automation rules created yet.</p></Card>}
            </div>
            <CommentRuleEditorPanel isOpen={isPanelOpen} rule={editingRule} onSave={handleSaveRule} onClose={() => setIsPanelOpen(false)} />
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const LinkedinDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('Post Scheduler');
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [rules, setRules] = useState([]);

    const handleConnect = () => { setIsConnecting(true); setTimeout(() => { setIsConnected(true); setIsConnecting(false); }, 1500); };
    
    if (!isConnected) {
        return (
            <div className="flex flex-col h-full">
                <SectionHeader icon={LinkedinIcon} title="LinkedIn Automation" />
                <Card className="flex-grow flex flex-col items-center justify-center text-center border-2 border-dashed bg-zinc-50">
                    <LinkedinIcon className="w-16 h-16 text-zinc-400 mb-4" />
                    <h3 className="text-2xl font-bold">Connect your LinkedIn Account</h3>
                    <p className="text-zinc-600 mt-2 max-w-sm">To get started with scheduling posts and automating comments, you first need to connect your LinkedIn account.</p>
                    <button onClick={handleConnect} disabled={isConnecting} className="mt-6 px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors">
                        {isConnecting ? <Clock className="w-5 h-5 animate-spin" /> : <LinkIcon className="w-5 h-5" />}
                        {isConnecting ? 'Connecting...' : 'Connect to LinkedIn'}
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <SectionHeader icon={LinkedinIcon} title="LinkedIn Automation" />
            <div className="border-b border-dotted border-black mb-6">
                <nav className="flex gap-4 overflow-x-auto">
                    {['Post Scheduler', 'AI Assistant', 'Comment Automation'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-black'}`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div>
                {activeTab === 'Post Scheduler' && <PostScheduler />}
                {activeTab === 'AI Assistant' && <AIAssistant />}
                {activeTab === 'Comment Automation' && <CommentAutomator rules={rules} setRules={setRules} />}
            </div>
        </div>
    );
};

// --- Main App Component (for demonstration) ---
export default function App() {
  return (
    <AppProvider>
        <div className="p-2 sm:p-6 bg-zinc-50 font-sans text-black" style={{ minHeight: '90vh' }}>
             <LinkedinDashboardPage />
        </div>
    </AppProvider>
  );
}
