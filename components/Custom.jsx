"use client"
import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Copy, Save, Search, Filter, 
  MessageSquare, X, Check, ChevronDown, ChevronUp, 
  User, Star, Activity, Zap, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomRepliesManager = () => {
  // Sample initial templates
  const initialTemplates = [
    {
      id: 1,
      name: "Discount Inquiry",
      category: "Sales",
      content: "Thanks for your interest! We offer 15% off on orders over $200. Use code INSTA15 at checkout. Let me know if you have any questions!",
      triggers: ["discount", "coupon", "promo"],
      usage: 128,
      lastUsed: "2023-10-15",
      favorites: true
    },
    {
      id: 2,
      name: "Product Question",
      category: "Support",
      content: "Great question! Our {product} features {feature1}, {feature2}, and {feature3}. You can learn more at our website: {link}. Would you like a personal demo?",
      triggers: ["feature", "how does", "what about"],
      usage: 94,
      lastUsed: "2023-10-12",
      favorites: false
    },
    {
      id: 3,
      name: "Order Status",
      category: "Support",
      content: "Thanks for reaching out! Your order #{orderNumber} is currently {status}. You'll receive a notification when it ships. Let me know if you need anything else!",
      triggers: ["where is", "track", "status"],
      usage: 76,
      lastUsed: "2023-10-10",
      favorites: true
    },
    {
      id: 4,
      name: "Collaboration Request",
      category: "Partnerships",
      content: "Thanks for your interest in collaborating! Please share your media kit and audience demographics. Our team will review and get back to you within 3 business days.",
      triggers: ["collab", "partnership", "influencer"],
      usage: 52,
      lastUsed: "2023-10-08",
      favorites: false
    }
  ];

  const [templates, setTemplates] = useState(initialTemplates);
  const [activeTemplate, setActiveTemplate] = useState(initialTemplates[0]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "Sales",
    content: "",
    triggers: "",
    favorites: false
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);
  const [showTriggers, setShowTriggers] = useState(false);
  
  // Available categories
  const categories = ["All", "Sales", "Support", "Partnerships", "Marketing", "Feedback", "Other"];
  
  // Handle template creation
  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) return;
    
    const template = {
      id: templates.length + 1,
      name: newTemplate.name,
      category: newTemplate.category,
      content: newTemplate.content,
      triggers: newTemplate.triggers.split(',').map(t => t.trim()),
      usage: 0,
      lastUsed: "",
      favorites: newTemplate.favorites
    };
    
    setTemplates([...templates, template]);
    setActiveTemplate(template);
    setNewTemplate({ 
      name: "", 
      category: "Sales", 
      content: "", 
      triggers: "",
      favorites: false
    });
    setShowTemplateModal(false);
    setEditMode(false);
  };
  
  // Handle template update
  const handleUpdateTemplate = () => {
    setTemplates(templates.map(t => 
      t.id === activeTemplate.id ? activeTemplate : t
    ));
    setEditMode(false);
  };
  
  // Handle template deletion
  const handleDeleteTemplate = (id) => {
    const updatedTemplates = templates.filter(t => t.id !== id);
    setTemplates(updatedTemplates);
    if (activeTemplate.id === id && updatedTemplates.length > 0) {
      setActiveTemplate(updatedTemplates[0]);
    } else if (updatedTemplates.length === 0) {
      setActiveTemplate(null);
    }
  };
  
  // Handle template duplication
  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      usage: 0,
      lastUsed: ""
    };
    
    setTemplates([...templates, duplicatedTemplate]);
    setActiveTemplate(duplicatedTemplate);
  };
  
  // Handle template favorite toggle
  const handleToggleFavorite = (id) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, favorites: !template.favorites } : template
    ));
    
    if (activeTemplate && activeTemplate.id === id) {
      setActiveTemplate({ ...activeTemplate, favorites: !activeTemplate.favorites });
    }
  };
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || template.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[600px]">
      {/* Template List Sidebar */}
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <MessageSquare className="text-pink-500 mr-2" size={20} />
              Reply Templates
            </h2>
            <button 
              onClick={() => setShowTemplateModal(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
              >
                <Filter size={14} className="mr-1" />
                {filterCategory}
                {showCategories ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </button>
              
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2"
                  >
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilterCategory(category);
                          setShowCategories(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 ${
                          filterCategory === category ? 'text-pink-500 font-medium' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setFilterCategory("Favorites")}
              className={`flex items-center text-xs px-3 py-2 rounded-lg ${
                filterCategory === "Favorites" 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <Star size={14} className="mr-1" />
              Favorites
            </button>
          </div>
        </div>
        
        {/* Template List */}
        <div className="overflow-y-auto max-h-[500px]">
          {filteredTemplates.length === 0 ? (
            <div className="p-8 text-center">
              <Bookmark className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={32} />
              <p className="text-gray-500 dark:text-gray-400">No templates found</p>
              <button 
                onClick={() => setShowTemplateModal(true)}
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Create Your First Template
              </button>
            </div>
          ) : (
            filteredTemplates.map(template => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all ${
                  activeTemplate?.id === template.id 
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-l-4 border-pink-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => {
                  setActiveTemplate(template);
                  setEditMode(false);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold">{template.name}</h3>
                      {template.favorites && (
                        <Star className="ml-2 text-yellow-400 fill-yellow-400" size={16} />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <span className="bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 px-2 py-1 rounded mr-2">
                        {template.category}
                      </span>
                      <span className="flex items-center">
                        <Activity size={12} className="mr-1" />
                        {template.usage} uses
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(template.id);
                    }}
                    className={`p-1 rounded-full ${
                      template.favorites 
                        ? 'text-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                    }`}
                  >
                    <Star size={16} fill={template.favorites ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {template.content}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      
      {/* Template Editor/Preview */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {activeTemplate ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      value={activeTemplate.name}
                      onChange={(e) => setActiveTemplate({...activeTemplate, name: e.target.value})}
                      className="text-xl font-bold bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg w-full max-w-md mb-2"
                    />
                  ) : (
                    <h2 className="text-xl font-bold flex items-center">
                      {activeTemplate.name}
                      {activeTemplate.favorites && (
                        <Star className="ml-2 text-yellow-400 fill-yellow-400" size={18} />
                      )}
                    </h2>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <span className="bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 px-2 py-1 rounded mr-2">
                      {activeTemplate.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      <Zap size={14} className="inline mr-1" />
                      {activeTemplate.usage} uses
                    </span>
                    {activeTemplate.lastUsed && (
                      <span className="ml-3 text-gray-500 dark:text-gray-400">
                        Last used: {activeTemplate.lastUsed}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {editMode ? (
                    <>
                      <button 
                        onClick={() => setEditMode(false)}
                        className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdateTemplate}
                        className="flex items-center text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg"
                      >
                        <Save size={16} className="mr-1" />
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleDuplicateTemplate(activeTemplate)}
                        className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        <Copy size={16} className="mr-1" />
                        Duplicate
                      </button>
                      <button 
                        onClick={() => setEditMode(true)}
                        className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleDeleteTemplate(activeTemplate.id)}
                    className="flex items-center text-sm bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Template Content */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <MessageSquare size={18} className="mr-2 text-pink-500" />
                    Template Content
                  </h3>
                  
                  {editMode ? (
                    <textarea
                      value={activeTemplate.content}
                      onChange={(e) => setActiveTemplate({...activeTemplate, content: e.target.value})}
                      className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-xl p-4"
                    />
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 min-h-[200px]">
                      <p className="whitespace-pre-wrap">{activeTemplate.content}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Use {"{variables}"} like {"{customerName}"} or {"{product}"} for personalization
                  </div>
                </div>
                
                {/* Triggers and Preview */}
                <div>
                  <div className="mb-8">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Zap size={18} className="mr-2 text-pink-500" />
                      Trigger Keywords
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activeTemplate.triggers.map((trigger, i) => (
                        <span 
                          key={i} 
                          className="bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-sm"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setShowTriggers(!showTriggers)}
                      className="text-sm text-pink-500 hover:text-pink-600 flex items-center"
                    >
                      {showTriggers ? "Hide" : "Show"} trigger settings
                      {showTriggers ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                    </button>
                    
                    {showTriggers && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Add or remove trigger keywords. Separate multiple keywords with commas.
                        </p>
                        <input
                          type="text"
                          value={activeTemplate.triggers.join(', ')}
                          onChange={(e) => setActiveTemplate({
                            ...activeTemplate, 
                            triggers: e.target.value.split(',').map(t => t.trim())
                          })}
                          className="w-full bg-white dark:bg-gray-700 rounded-lg px-4 py-2 text-sm"
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <User size={18} className="mr-2 text-pink-500" />
                      Preview
                    </h3>
                    
                    <div className="bg-gray-900 rounded-xl p-4">
                      <div className="flex mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white mr-3">
                          <User size={16} />
                        </div>
                        <div className="bg-gray-700 rounded-xl p-3 flex-1">
                          <div className="text-sm">Sample customer message with trigger word</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-3 max-w-xs">
                          <div className="text-sm text-white">
                            {activeTemplate.content.substring(0, 100)}...
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-gray-400 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          Auto-reply triggered by keyword
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-4 flex items-center">
                  <Activity size={18} className="mr-2 text-pink-500" />
                  Template Performance
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{activeTemplate.usage}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Total Uses</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Response Rate</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">4.8s</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Avg. Reply Time</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">18%</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="text-gray-300 dark:text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">No Template Selected</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Select a template from the list to view and edit it, or create a new template to get started.
            </p>
            <button 
              onClick={() => setShowTemplateModal(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              <Plus className="mr-2" size={20} />
              Create New Template
            </button>
          </div>
        )}
      </div>
      
      {/* Template Creation Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Create New Template</h3>
              <button 
                onClick={() => {
                  setShowTemplateModal(false);
                  setEditMode(false);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2"
                  placeholder="e.g., Discount Inquiry"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2"
                >
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Partnerships">Partnerships</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Template Content</label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 min-h-[150px]"
                  placeholder="Write your template response here..."
                ></textarea>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use {"{variables}"} like {"{customerName}"} or {"{product}"} for personalization
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Trigger Keywords (comma separated)</label>
                <input
                  type="text"
                  value={newTemplate.triggers}
                  onChange={(e) => setNewTemplate({...newTemplate, triggers: e.target.value})}
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2"
                  placeholder="e.g., discount, coupon, promo code"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={newTemplate.favorites}
                  onChange={(e) => setNewTemplate({...newTemplate, favorites: e.target.checked})}
                  className="mr-2 h-4 w-4 text-pink-500 rounded focus:ring-pink-500"
                />
                <label htmlFor="favorite" className="text-sm">
                  Mark as favorite
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-8 space-x-3">
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTemplate}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <Plus className="mr-1" size={18} />
                Create Template
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomRepliesManager;