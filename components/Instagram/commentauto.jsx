"use client"
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  MessageSquare, Plus, Check, Trash2, X as XIcon, ChevronLeft, ChevronRight, Settings, Image as ImageIcon, CheckCircle2, Circle, List, Tag, UserCheck, Clock
} from 'lucide-react';

// --- MOCK CONTEXT & HELPERS (for standalone demonstration) ---
const StandaloneContext = createContext();
const useStandaloneContext = () => useContext(StandaloneContext);

const AppProvider = ({ children }) => {
    const [activePage, setActivePage] = useState('/comment-automation');
    const value = { activePage, setActivePage };
    return <StandaloneContext.Provider value={value}>{children}</StandaloneContext.Provider>;
}

// --- REUSABLE UI COMPONENTS ---

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

// --- COMMENT AUTOMATION COMPONENTS ---

/**
 * @typedef {'all' | 'future' | 'specific'} PostSelectionType
 * @typedef {'all_comments' | 'specific_keywords'} TriggerType
 */

/**
 * @typedef {object} AutomationRule
 * @property {number} id
 * @property {string} name
 * @property {PostSelectionType} postSelection
 * @property {number[]} selectedPostIds
 * @property {TriggerType} triggerType
 * @property {string[]} triggerKeywords
 * @property {boolean} followerCondition
 * @property {number} replyDelay
 * @property {string[]} replies
 * @property {boolean} isActive
 */

const mockPosts = [
    { id: 101, imageUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=Post+1' },
    { id: 102, imageUrl: 'https://placehold.co/400x400/31343C/FFFFFF?text=Post+2' },
    { id: 103, imageUrl: 'https://placehold.co/400x400/929497/FFFFFF?text=Post+3' },
    { id: 104, imageUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=Post+4' },
    { id: 105, imageUrl: 'https://placehold.co/400x400/31343C/FFFFFF?text=Post+5' },
    { id: 106, imageUrl: 'https://placehold.co/400x400/929497/FFFFFF?text=Post+6' },
    { id: 107, imageUrl: 'https://placehold.co/400x400/31343C/FFFFFF?text=Post+7' },
    { id: 108, imageUrl: 'https://placehold.co/400x400/929497/FFFFFF?text=Post+8' },
];

/**
 * A slide-in panel for creating or editing an automation rule.
 * @param {{ isOpen: boolean, rule?: AutomationRule, onSave: (rule: AutomationRule) => void, onClose: () => void }} props
 */
const RuleEditorPanel = ({ isOpen, rule, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [postSelection, setPostSelection] = useState('all');
    const [selectedPostIds, setSelectedPostIds] = useState([]);
    const [triggerType, setTriggerType] = useState('all_comments');
    const [triggerKeywords, setTriggerKeywords] = useState('');
    const [followerCondition, setFollowerCondition] = useState(false);
    const [replyDelay, setReplyDelay] = useState(2000);
    const [replies, setReplies] = useState(['']);

    useEffect(() => {
        setName(rule?.name || 'New Comment Rule');
        setPostSelection(rule?.postSelection || 'all');
        setSelectedPostIds(rule?.selectedPostIds || []);
        setTriggerType(rule?.triggerType || 'all_comments');
        setTriggerKeywords(rule?.triggerKeywords?.join(', ') || '');
        setFollowerCondition(rule?.followerCondition || false);
        setReplyDelay(rule?.replyDelay ?? 2000);
        setReplies(rule?.replies?.length ? rule.replies : ['']);
    }, [rule, isOpen]);

    const handleSave = () => {
        onSave({
            id: rule?.id || Date.now(),
            name,
            postSelection,
            selectedPostIds,
            triggerType,
            triggerKeywords: triggerKeywords.split(',').map(k => k.trim()).filter(Boolean),
            followerCondition,
            replyDelay,
            replies: replies.filter(Boolean),
            isActive: rule?.isActive ?? true,
        });
    };
    
    const togglePostSelection = (postId) => {
        setSelectedPostIds(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
    };

    const handleReplyChange = (index, value) => {
        const newReplies = [...replies];
        newReplies[index] = value;
        setReplies(newReplies);
    };

    const addReply = () => setReplies([...replies, '']);
    const removeReply = (index) => setReplies(replies.filter((_, i) => i !== index));

    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'bg-black/40' : 'bg-transparent pointer-events-none'}`} onClick={onClose}>
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Panel Header */}
                <div className="flex items-center justify-between p-4 border-b border-dotted border-black flex-shrink-0 bg-white">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-xl font-bold bg-transparent focus:outline-none focus:ring-0 w-full" />
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 transition-colors"><XIcon className="w-5 h-5" /></button>
                </div>

                {/* Panel Body */}
                <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2"><span className="text-white bg-black rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span> Select Posts</h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button onClick={() => setPostSelection('all')} className={`flex-1 text-center p-3 rounded-lg border border-dotted transition-colors ${postSelection === 'all' ? 'bg-zinc-100 border-black' : 'border-zinc-300 hover:border-black'}`}>All Posts</button>
                            <button onClick={() => setPostSelection('future')} className={`flex-1 text-center p-3 rounded-lg border border-dotted transition-colors ${postSelection === 'future' ? 'bg-zinc-100 border-black' : 'border-zinc-300 hover:border-black'}`}>Future Posts</button>
                            <button onClick={() => setPostSelection('specific')} className={`flex-1 text-center p-3 rounded-lg border border-dotted transition-colors ${postSelection === 'specific' ? 'bg-zinc-100 border-black' : 'border-zinc-300 hover:border-black'}`}>Specific</button>
                        </div>
                        {postSelection === 'specific' && (
                            <div className="grid grid-cols-4 gap-3 max-h-52 overflow-y-auto p-2 bg-white rounded-lg border border-dotted border-zinc-300">
                                {mockPosts.map(post => (
                                    <div key={post.id} onClick={() => togglePostSelection(post.id)} className="relative cursor-pointer aspect-square group">
                                        <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full h-full object-cover rounded-md" />
                                        <div className={`absolute inset-0 bg-black transition-opacity rounded-md ${selectedPostIds.includes(post.id) ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}></div>
                                        <div className={`absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPostIds.includes(post.id) ? 'bg-black border-black text-white' : 'bg-white/50 border-white'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2"><span className="text-white bg-black rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span> Set Trigger</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div onClick={() => setTriggerType('all_comments')} className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 hover:border-black transition-colors bg-white">
                                {triggerType === 'all_comments' ? <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" /> : <Circle className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-0.5" />}
                                <div><h4 className="font-bold">All Comments</h4><p className="text-sm text-zinc-600">Reply to every top-level comment.</p></div>
                            </div>
                            <div onClick={() => setTriggerType('specific_keywords')} className="flex-1 p-4 border border-dotted rounded-lg cursor-pointer flex items-start gap-3 hover:border-black transition-colors bg-white">
                                {triggerType === 'specific_keywords' ? <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" /> : <Circle className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-0.5" />}
                                <div><h4 className="font-bold">Keywords</h4><p className="text-sm text-zinc-600">Only reply if comment includes words.</p></div>
                            </div>
                        </div>
                        {triggerType === 'specific_keywords' && (
                            <div className="pt-2"><input type="text" value={triggerKeywords} onChange={e => setTriggerKeywords(e.target.value)} className="w-full p-2 bg-white border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black" placeholder="e.g. price, how much, cost" /></div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2"><span className="text-white bg-black rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span> Add Conditions</h3>
                        <div className="p-4 border border-dotted rounded-lg bg-white flex items-center justify-between">
                            <div>
                                <h4 className="font-bold">User must be a follower</h4>
                                <p className="text-sm text-zinc-600">Only reply to comments from your followers.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={followerCondition} onChange={(e) => setFollowerCondition(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2"><span className="text-white bg-black rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span> Set Action: Reply</h3>
                        <div className="p-4 border border-dotted rounded-lg bg-white space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700">Reply Delay</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <input type="number" value={replyDelay} onChange={e => setReplyDelay(Number(e.target.value))} className="w-32 p-2 bg-white border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black" placeholder="e.g. 60" />
                                    <span className="text-sm text-zinc-600">seconds</span>
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">A delay makes replies feel more natural. Recommended: 30 - 3000 seconds.</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-700">Reply Variations</p>
                                <p className="text-xs text-zinc-600 mb-2">One will be chosen at random to appear more natural.</p>
                                <div className="space-y-3">
                                    {replies.map((reply, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="text" value={reply} onChange={(e) => handleReplyChange(index, e.target.value)} className="flex-grow p-2 bg-white border border-dotted border-zinc-400 rounded-lg focus:ring-1 focus:ring-black focus:border-black" placeholder={`Reply variation #${index + 1}`} />
                                            <button onClick={() => removeReply(index)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={addReply} className="mt-3 px-3 py-1.5 border border-black rounded-lg flex items-center gap-2 hover:bg-zinc-100 transition-colors text-sm">
                                    <Plus className="w-4 h-4" /> Add reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel Footer */}
                <div className="p-4 bg-white border-t border-dotted border-black flex-shrink-0">
                    <button onClick={handleSave} className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-bold">
                        Save Rule
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const CommentAutomationPage = () => {
    const [rules, setRules] = useState([
        { id: 1, name: "Price Inquiries", postSelection: 'all', selectedPostIds: [], triggerType: 'specific_keywords', triggerKeywords: ['price', 'cost', 'how much'], followerCondition: true, replyDelay: 60, replies: ["Thanks for asking! We've sent you a DM with the details.", "Just sent you a DM with the pricing info!"], isActive: true },
        { id: 2, name: "General Thank You", postSelection: 'future', selectedPostIds: [], triggerType: 'all_comments', triggerKeywords: [], followerCondition: false, replyDelay: 2000, replies: ["Thanks for your comment! 🙌", "We appreciate you! ❤️"], isActive: false }
    ]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);

    const handleSaveRule = (ruleData) => {
        const existingIndex = rules.findIndex(r => r.id === ruleData.id);
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
    
    const handleDeleteRule = (id) => setRules(rules.filter(r => r.id !== id));
    const toggleRuleStatus = (id) => setRules(rules.map(r => r.id === id ? {...r, isActive: !r.isActive} : r));

    return (
        <div className="flex flex-col h-full">
            <SectionHeader icon={MessageSquare} title="Comment Automation">
                <button onClick={handleNewRule} className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors">
                    <Plus className="w-4 h-4" /> New Rule
                </button>
            </SectionHeader>

            <div className="space-y-4">
                {rules.map(rule => (
                    <Card key={rule.id} className="!p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-grow">
                            <h4 className="font-bold">{rule.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-zinc-600 mt-1 flex-wrap">
                                <span className="flex items-center gap-1.5"><List className="w-4 h-4" /> {rule.postSelection === 'specific' ? `${rule.selectedPostIds.length} Posts` : rule.postSelection.replace(/^\w/, c => c.toUpperCase()) + ' Posts'}</span>
                                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {rule.triggerType === 'specific_keywords' ? `${rule.triggerKeywords.length} Keywords` : 'All Comments'}</span>
                                {rule.followerCondition && <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4" /> Followers Only</span>}
                                {rule.replyDelay > 0 && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {rule.replyDelay}s Delay</span>}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={rule.isActive} onChange={() => toggleRuleStatus(rule.id)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                            <button onClick={() => handleEditRule(rule)} className="px-3 py-1 border border-black rounded-md text-sm hover:bg-zinc-100 transition-colors">Edit</button>
                            <button onClick={() => handleDeleteRule(rule.id)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </Card>
                ))}
                 {rules.length === 0 && (
                    <Card className="text-center py-12 border-2 border-dashed">
                        <MessageSquare className="mx-auto h-12 w-12 text-zinc-400" />
                        <h3 className="mt-2 text-lg font-medium">No rules yet</h3>
                        <p className="mt-1 text-sm text-zinc-500">Click 'New Rule' to get started.</p>
                    </Card>
                )}
            </div>

            <RuleEditorPanel isOpen={isPanelOpen} rule={editingRule} onSave={handleSaveRule} onClose={() => setIsPanelOpen(false)} />
        </div>
    );
};

// --- Main App Component (for demonstration) ---
export default function COMMENT_AUTOMATION() {
  return (
    <AppProvider>
        <div className="p-2 sm:p-6 bg-zinc-50 font-sans text-black" style={{ height: '90vh' }}>
             <CommentAutomationPage />
        </div>
    </AppProvider>
  );
}
