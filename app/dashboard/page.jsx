"use client";

// import { useState, useEffect } from "react";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// // --- SVG Icon Components ---
// const HomeIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//     <polyline points="9 22 9 12 15 12 15 22"></polyline>
//   </svg>
// );
// const BotIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M12 8V4H8"></path>
//     <rect width="16" height="12" x="4" y="8" rx="2"></rect>
//     <path d="M2 14h2"></path>
//     <path d="M20 14h2"></path>
//     <path d="M15 13v2"></path>
//     <path d="M9 13v2"></path>
//   </svg>
// );
// const BarChartIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <line x1="12" x2="12" y1="20" y2="10"></line>
//     <line x1="18" x2="18" y1="20" y2="4"></line>
//     <line x1="6" x2="6" y1="20" y2="16"></line>
//   </svg>
// );
// const SettingsIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
//     <circle cx="12" cy="12" r="3"></circle>
//   </svg>
// );
// const MenuIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <line x1="4" x2="20" y1="12" y2="12"></line>
//     <line x1="4" x2="20" y1="6" y2="6"></line>
//     <line x1="4" x2="20" y1="18" y2="18"></line>
//   </svg>
// );
// const XIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M18 6 6 18"></path>
//     <path d="m6 6 12 12"></path>
//   </svg>
// );
// const BellIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//     <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//   </svg>
// );
// const CalendarIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
//     <line x1="16" x2="16" y1="2" y2="6"></line>
//     <line x1="8" x2="8" y1="2" y2="6"></line>
//     <line x1="3" x2="21" y1="10" y2="10"></line>
//   </svg>
// );
// const UserIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//     <circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );
// const PlusIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <line x1="12" y1="5" x2="12" y2="19"></line>
//     <line x1="5" y1="12" x2="19" y2="12"></line>
//   </svg>
// );

// // --- Main Dashboard Component ---
// export default function DashboardPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New follower",
//       message: "@designer_anna started following you",
//       time: "2m ago",
//       read: false,
//     },
//     {
//       id: 2,
//       title: "Automation completed",
//       message: "Scheduled post was published successfully",
//       time: "1h ago",
//       read: true,
//     },
//     {
//       id: 3,
//       title: "New message",
//       message: "You have a new message from @marketer_john",
//       time: "3h ago",
//       read: true,
//     },
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [activeAutomations, setActiveAutomations] = useState([
//     {
//       id: 1,
//       name: "Welcome DM",
//       type: "DM",
//       status: "active",
//       triggers: 142,
//       lastRun: "2 hours ago",
//     },
//     {
//       id: 2,
//       name: "Collab Responder",
//       type: "DM",
//       status: "active",
//       triggers: 89,
//       lastRun: "5 hours ago",
//     },
//     {
//       id: 3,
//       name: "Weekly Post",
//       type: "Post",
//       status: "scheduled",
//       triggers: 24,
//       lastRun: "1 day ago",
//     },
//     {
//       id: 4,
//       name: "Story Mention",
//       type: "Story",
//       status: "paused",
//       triggers: 56,
//       lastRun: "3 days ago",
//     },
//   ]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const navItems = [
//     { name: "Dashboard", icon: HomeIcon },
//     { name: "Automations", icon: BotIcon },
//     { name: "Analytics", icon: BarChartIcon },
//     { name: "Scheduler", icon: CalendarIcon },
//     { name: "Settings", icon: SettingsIcon },
//   ];

//   const stats = [
//     { name: "Followers", value: "24.8K", change: "+12%", icon: UserIcon },
//     { name: "Engagement", value: "8.2%", change: "+3.4%", icon: BarChartIcon },
//     { name: "Automations", value: "12", change: "+2", icon: BotIcon },
//     { name: "Scheduled", value: "7", change: "+1", icon: CalendarIcon },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Dashboard":
//         return;
//         <DashboardContent stats={stats} />;
//       case "Automations":
//         return <AutomationsContent activeAutomations={activeAutomations} />;
//       case "Analytics":
//         return <AnalyticsContent />;
//       case "Scheduler":
//         return <SchedulerContent />;
//       case "Settings":
//         return (
//           <SettingsContent darkMode={darkMode} setDarkMode={setDarkMode} />
//         );
//       default:
//         return;
//         <DashboardContent stats={stats} />;
//     }
//   };

//   const markNotificationAsRead = (id) => {
//     setNotifications(
//       notifications.map((notif) =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     );
//   };
//   console.log(setActiveAutomations);
//   return (
//     <div
//       className={`flex h-screen bg-gray-50 dark:bg-gray-900 font-sans ${
//         darkMode ? "dark" : ""
//       }`}
//     >
//       {/* --- Sidebar --- */}
//       <aside
//         className={`absolute lg:relative w-64 h-full bg-white dark:bg-gray-800 shadow-md transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
//       >
//         <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
//           <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
//             InstaAuto
//           </h1>
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white"
//           >
//             <XIcon className="w-6 h-6" />
//           </button>
//         </div>
//         <nav className="mt-6">
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveTab(item.name);
//                 setIsSidebarOpen(false);
//               }}
//               className={`flex items-center px-4 py-3 m-2 rounded-lg transition-colors duration-200 ${
//                 activeTab === item.name
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//               }`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="ml-4 font-medium">{item.name}</span>
//             </a>
//           ))}
//         </nav>
//         <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
//           <div className="flex items-center">
//             <img
//               src={`https://placehold.co/40x40/6366f1/ffffff?text=U`}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="ml-3">
//               <p className="font-semibold text-sm text-black dark:text-white">
//                 Alex Morgan
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Premium Plan
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* --- Main Content --- */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 lg:hidden">
//           <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
//             InstaAuto
//           </h1>
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
//           >
//             <MenuIcon className="w-6 h-6" />
//           </button>
//         </header>

//         {/* Desktop Header */}
//         <header className="hidden lg:flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
//           <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
//             {activeTab}
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               {darkMode ? (
//                 <span className="text-yellow-400">☀️</span>
//               ) : (
//                 <span className="text-gray-600">🌙</span>
//               )}
//             </button>

//             <div className="relative">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
//               >
//                 <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//                 {notifications.filter((n) => !n.read).length > 0 && (
//                   <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications.filter((n) => !n.read).length}
//                   </span>
//                 )}
//               </button>

//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
//                   <div className="p-3 border-b dark:border-gray-700">
//                     <h3 className="font-semibold text-gray-900 dark:text-white">
//                       Notifications
//                     </h3>
//                   </div>
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.map((notification) => (
//                       <div
//                         key={notification.id}
//                         className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
//                           !notification.read
//                             ? "bg-blue-50 dark:bg-gray-750"
//                             : ""
//                         }`}
//                         onClick={() => markNotificationAsRead(notification.id)}
//                       >
//                         <div className="flex justify-between">
//                           <h4 className="font-medium text-gray-900 dark:text-white">
//                             {notification.title}
//                           </h4>
//                           <span className="text-xs text-gray-500">
//                             {notification.time}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                           {notification.message}
//                         </p>
//                         {!notification.read && (
//                           <div className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//                             New
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="p-3 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
//                     <a href="#">View all notifications</a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center">
//               <img
//                 src={`https://placehold.co/40x40/6366f1/ffffff?text=U`}
//                 alt="User Avatar"
//                 className="w-9 h-9 rounded-full"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Alex Morgan
//               </span>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// // // --- Dashboard Content ---
// const DashboardContent = ({ stats }) => {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Dashboard Overview
//           </h2>
//           <p className="text-gray-500 dark:text-gray-400">
//             Your Instagram performance summary
//           </p>
//         </div>
//         <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//           <PlusIcon className="w-5 h-5 mr-2" />
//           New Automation
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
//           >
//             <div className="flex items-center">
//               <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
//                 <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   {stat.name}
//                 </p>
//                 <div className="flex items-baseline">
//                   <p className="text-2xl font-semibold text-gray-900 dark:text-white">
//                     {stat.value}
//                   </p>
//                   <span className="ml-2 text-sm font-medium text-green-500">
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Engagement Rate
//           </h3>
//           <div className="h-80">
//             <LineChart />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Follower Growth
//           </h3>
//           <div className="h-80">
//             <BarChart />
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Recent Activity
//           </h3>
//           <a
//             href="#"
//             className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
//           >
//             View all
//           </a>
//         </div>
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg"
//             >
//               <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
//                 <BotIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <div className="ml-4">
//                 <h4 className="font-medium text-gray-900 dark:text-white">
//                   Automation completed
//                 </h4>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Welcome DM sent to @new_follower_123
//                 </p>
//                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//                   2 hours ago
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Automations Content ---
// const AutomationsContent = ({ activeAutomations }) => {
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Automations
//           </h2>
//           <p className="text-gray-500 dark:text-gray-400">
//             Manage your Instagram automation rules
//           </p>
//         </div>
//         <button
//           onClick={() => setShowCreateForm(true)}
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           <PlusIcon className="w-5 h-5 mr-2" />
//           New Automation
//         </button>
//       </div>

//       {showCreateForm ? (
//         <CreateAutomationForm onCancel={() => setShowCreateForm(false)} />
//       ) : (
//         <>
//           {/* Automation Table */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-750">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Type
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Triggers
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Last Run
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {activeAutomations.map((automation) => (
//                     <tr
//                       key={automation.id}
//                       className="hover:bg-gray-50 dark:hover:bg-gray-750"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium text-gray-900 dark:text-white">
//                           {automation.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                           {automation.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             automation.status === "active"
//                               ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                               : automation.status === "paused"
//                               ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//                               : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//                           }`}
//                         >
//                           {automation.status.charAt(0).toUpperCase() +
//                             automation.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
//                         {automation.triggers}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
//                         {automation.lastRun}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <a
//                           href="#"
//                           className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
//                         >
//                           Edit
//                         </a>
//                         <a
//                           href="#"
//                           className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//                         >
//                           Delete
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
//                   <BotIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Active Automations
//                   </p>
//                   <p className="text-2xl font-semibold text-gray-900 dark:text-white">
//                     8
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
//                   <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Scheduled This Week
//                   </p>
//                   <p className="text-2xl font-semibold text-gray-900 dark:text-white">
//                     12
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
//                   <BarChartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Avg. Response Time
//                   </p>
//                   <p className="text-2xl font-semibold text-gray-900 dark:text-white">
//                     32s
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // --- Analytics Content ---
// const AnalyticsContent = () => {
//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Analytics
//         </h2>
//         <p className="text-gray-500 dark:text-gray-400">
//           Track your Instagram performance and engagement
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Engagement Overview
//           </h3>
//           <div className="h-80">
//             <LineChart />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Audience Demographics
//           </h3>
//           <div className="h-80">
//             <PieChart />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Top Performing Content
//           </h3>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg"
//               >
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
//                 <div className="ml-4">
//                   <h4 className="font-medium text-gray-900 dark:text-white">
//                     Summer Collection Launch
//                   </h4>
//                   <div className="flex items-center mt-1">
//                     <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
//                       ❤️ 2.4K
//                     </span>
//                     <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
//                       💬 142
//                     </span>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       📈 8.7%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Follower Growth
//           </h3>
//           <div className="h-72">
//             <BarChart />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Scheduler Content ---
// const SchedulerContent = () => {
//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Content Scheduler
//         </h2>
//         <p className="text-gray-500 dark:text-gray-400">
//           Plan and schedule your Instagram posts
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Calendar View
//           </h3>
//           <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 min-h-[400px]">
//             <div className="flex justify-between mb-4">
//               <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                 &larr;
//               </button>
//               <h4 className="font-medium text-gray-900 dark:text-white">
//                 August 2023
//               </h4>
//               <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                 &rarr;
//               </button>
//             </div>
//             <div className="grid grid-cols-7 gap-2 mb-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div
//                   key={day}
//                   className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 p-2"
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>
//             <div className="grid grid-cols-7 gap-2">
//               {[...Array(35)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`min-h-20 border dark:border-gray-700 rounded-lg p-2 ${
//                     i >= 1 && i <= 5 ? "bg-indigo-50 dark:bg-indigo-900/20" : ""
//                   }`}
//                 >
//                   <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
//                     {i + 1}
//                   </div>
//                   {i === 3 && (
//                     <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded p-1 mb-1">
//                       Product Launch
//                     </div>
//                   )}
//                   {i === 7 && (
//                     <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded p-1">
//                       Promotion
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Scheduled Posts
//           </h3>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="border dark:border-gray-700 rounded-lg p-4"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-medium text-gray-900 dark:text-white">
//                     Summer Collection Preview
//                   </h4>
//                   <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full px-2 py-1">
//                     Scheduled
//                   </span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
//                   <CalendarIcon className="w-4 h-4 mr-1" />
//                   Aug 15, 2023 · 9:30 AM
//                 </div>
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 mb-3" />
//                 <div className="flex justify-between">
//                   <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
//                     Edit
//                   </button>
//                   <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
//                     Reschedule
//                   </button>
//                   <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Settings Content ---
// const SettingsContent = ({ darkMode, setDarkMode }) => {
//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Account Settings
//         </h2>
//         <p className="text-gray-500 dark:text-gray-400">
//           Manage your account preferences
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
//             Profile
//           </h3>

//           <div className="flex items-center mb-8">
//             <img
//               src={`https://placehold.co/80x80/6366f1/ffffff?text=U`}
//               alt="User Avatar"
//               className="w-16 h-16 rounded-full"
//             />
//             <div className="ml-4">
//               <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors mr-3">
//                 Change Photo
//               </button>
//               <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors">
//                 Remove
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 defaultValue="Alex Morgan"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 defaultValue="alex.morgan@example.com"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 defaultValue="@alexmorgan"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 defaultValue="+1 (555) 123-4567"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               />
//             </div>
//           </div>

//           <div className="mt-8">
//             <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//               Save Changes
//             </button>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
//             Preferences
//           </h3>

//           <div className="space-y-6">
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white mb-3">
//                 Appearance
//               </h4>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => setDarkMode(false)}
//                   className={`flex-1 py-2 rounded-l-lg border-t border-b border-l ${
//                     !darkMode
//                       ? "bg-indigo-600 text-white border-indigo-600"
//                       : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
//                   }`}
//                 >
//                   Light
//                 </button>
//                 <button
//                   onClick={() => setDarkMode(true)}
//                   className={`flex-1 py-2 rounded-r-lg border-t border-b border-r ${
//                     darkMode
//                       ? "bg-indigo-600 text-white border-indigo-600"
//                       : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
//                   }`}
//                 >
//                   Dark
//                 </button>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white mb-3">
//                 Notifications
//               </h4>
//               <div className="space-y-3">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="rounded text-indigo-600 focus:ring-indigo-500"
//                     defaultChecked
//                   />
//                   <span className="ml-2 text-gray-700 dark:text-gray-300">
//                     Email notifications
//                   </span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="rounded text-indigo-600 focus:ring-indigo-500"
//                     defaultChecked
//                   />
//                   <span className="ml-2 text-gray-700 dark:text-gray-300">
//                     Push notifications
//                   </span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="rounded text-indigo-600 focus:ring-indigo-500"
//                   />
//                   <span className="ml-2 text-gray-700 dark:text-gray-300">
//                     Text messages
//                   </span>
//                 </label>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white mb-3">
//                 Account
//               </h4>
//               <div className="space-y-3">
//                 <button className="w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
//                   Change Password
//                 </button>
//                 <button className="w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
//                   Two-factor Authentication
//                 </button>
//                 <button className="w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Create Automation Form ---
// const CreateAutomationForm = ({ onCancel }) => {
//   const [step, setStep] = useState(1);

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//           {step === 1 ? "Select Automation Type" : "Configure Automation"}
//         </h3>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <XIcon className="w-6 h-6" />
//         </button>
//       </div>

//       {step === 1 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => setStep(2)}
//             className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-left"
//           >
//             <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 inline-block mb-4">
//               <BotIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               Direct Message
//             </h4>
//             <p className="text-gray-500 dark:text-gray-400">
//               Automatically respond to DMs based on keywords or triggers
//             </p>
//           </button>

//           <button
//             onClick={() => setStep(2)}
//             className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-left"
//           >
//             <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 inline-block mb-4">
//               <CalendarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//             </div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               Scheduled Post
//             </h4>
//             <p className="text-gray-500 dark:text-gray-400">
//               Schedule posts to be published at specific times automatically
//             </p>
//           </button>

//           <button
//             onClick={() => setStep(2)}
//             className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-left"
//           >
//             <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 inline-block mb-4">
//               <UserIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
//             </div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               New Follower
//             </h4>
//             <p className="text-gray-500 dark:text-gray-400">
//               Automatically welcome new followers with a DM or comment
//             </p>
//           </button>

//           <button
//             onClick={() => setStep(2)}
//             className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-left"
//           >
//             <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 inline-block mb-4">
//               <BarChartIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//             </div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               Engagement
//             </h4>
//             <p className="text-gray-500 dark:text-gray-400">
//               Automatically engage with posts from specific accounts or hashtags
//             </p>
//           </button>
//         </div>
//       ) : (
//         <div>
//           <form className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Automation Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g., Welcome Message"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Trigger
//               </label>
//               <select className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white">
//                 <option>New follower</option>
//                 <option>Direct message received</option>
//                 <option>Mention in story</option>
//                 <option>Tagged in post</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Action
//               </label>
//               <select className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white">
//                 <option>Send direct message</option>
//                 <option>Post a comment</option>
//                 <option>Like the post</option>
//                 <option>Add to story</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Message Content
//               </label>
//               <textarea
//                 rows={4}
//                 placeholder="Write your message here..."
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
//               ></textarea>
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 Create Automation
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- Chart Components ---
// const LineChart = () => {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "Engagement Rate",
//         data: [5.2, 6.1, 7.4, 8.2, 7.8, 8.5, 9.1],
//         borderColor: "rgb(79, 70, 229)",
//         backgroundColor: "rgba(79, 70, 229, 0.1)",
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//         },
//         ticks: {
//           callback: function (value) {
//             return value + "%";
//           },
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// const BarChart = () => {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "New Followers",
//         data: [850, 1100, 980, 1250, 1400, 1650, 2000],
//         backgroundColor: "rgba(79, 70, 229, 0.8)",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// const PieChart = () => {
//   const data = {
//     labels: ["18-24", "25-34", "35-44", "45+"],
//     datasets: [
//       {
//         data: [35, 45, 15, 5],
//         backgroundColor: [
//           "rgba(79, 70, 229, 0.8)",
//           "rgba(99, 102, 241, 0.8)",
//           "rgba(129, 140, 248, 0.8)",
//           "rgba(165, 180, 252, 0.8)",
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "right",
//         labels: {
//           color: "#6B7280",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//   };

//   return <Pie data={data} options={options} />;
// };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, MessageSquare, Calendar, Zap, 
  Send, ThumbsUp, Filter, Plus, 
  Search, Trash2, Edit, Settings,
  Bell, User, ChevronDown, X,
  Bookmark, BarChart2, Mail, Users, Clock
} from 'lucide-react';

const InstagramAutomationDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dm');
  const [scheduledPosts, setScheduledPosts] = useState([
    { 
      id: 1, 
      content: 'Introducing our new summer collection', 
      date: '2023-11-15', 
      time: '14:30', 
      status: 'scheduled',
      platform: 'Instagram'
    },
    { 
      id: 2, 
      content: 'Behind the scenes at our design studio', 
      date: '2023-11-17', 
      time: '11:00', 
      status: 'scheduled',
      platform: 'Instagram'
    },
    { 
      id: 3, 
      content: 'Flash sale starts tomorrow!', 
      date: '2023-11-20', 
      time: '09:00', 
      status: 'scheduled',
      platform: 'Instagram'
    }
  ]);
  
  const [automationSettings, setAutomationSettings] = useState({
    dm: { enabled: true, responseTime: '5m', aiResponses: true },
    comments: { enabled: true, likeComments: true, replyToMentions: true },
    schedule: { optimalTimes: true, autoReschedule: true }
  });
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    scheduleDate: '',
    scheduleTime: '',
    caption: ''
  });

  const toggleAutomation = (type) => {
    setAutomationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled
      }
    }));
  };

  const handleSchedulePost = () => {
    if (!newPost.content || !newPost.scheduleDate || !newPost.scheduleTime) return;
    
    const post = {
      id: scheduledPosts.length + 1,
      content: newPost.content,
      date: newPost.scheduleDate,
      time: newPost.scheduleTime,
      status: 'scheduled',
      platform: 'Instagram'
    };
    
    setScheduledPosts([...scheduledPosts, post]);
    setNewPost({
      content: '',
      scheduleDate: '',
      scheduleTime: '',
      caption: ''
    });
    setShowCreatePost(false);
  };

  const handleDeletePost = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };

  // DM Automation Tab
  const renderDMAutomation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Direct Message Settings</h3>
          <ToggleSwitch 
            checked={automationSettings.dm.enabled}
            onChange={() => toggleAutomation('dm')}
          />
        </div>
        
        {automationSettings.dm.enabled && (
          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Response Time</label>
              <select className="bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-800 dark:text-gray-200">
                <option>Immediately</option>
                <option selected>Within 5 minutes</option>
                <option>Within 15 minutes</option>
                <option>Within 30 minutes</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Maximum time to respond to messages</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-750">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">AI-Powered Responses</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Smart replies to messages</p>
              </div>
              <ToggleSwitch 
                checked={automationSettings.dm.aiResponses}
                onChange={() => setAutomationSettings(prev => ({
                  ...prev,
                  dm: {
                    ...prev.dm,
                    aiResponses: !prev.dm.aiResponses
                  }
                }))}
              />
            </div>
            
            <button className="w-full bg-gradient-to-r from-pink-550 to-purple-600 hover:from-pink-600 hover:to-purple-650 text-white py-3 rounded-lg font-medium transition-all mt-4">
              Manage Response Templates
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
          <button className="text-sm font-medium text-pink-550">View All</button>
        </div>
        
        <div className="space-y-4">
          <ActivityItem 
            icon={<MessageSquare size={18} className="text-pink-550" />}
            title="New message from @johndoe"
            description="Hi, when will my order ship?"
            time="2 min ago"
          />
          <ActivityItem 
            icon={<Zap size={18} className="text-green-500" />}
            title="Auto-reply sent to @sarahsmith"
            description="Thanks for reaching out! Your order will ship tomorrow"
            time="15 min ago"
          />
          <ActivityItem 
            icon={<MessageSquare size={18} className="text-pink-550" />}
            title="New message from @mikewilson"
            description="Do you offer international shipping?"
            time="25 min ago"
          />
        </div>
      </div>
    </div>
  );

  // Comment Automation Tab
  const renderCommentAutomation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Comment Settings</h3>
          <ToggleSwitch 
            checked={automationSettings.comments.enabled}
            onChange={() => toggleAutomation('comments')}
          />
        </div>
        
        {automationSettings.comments.enabled && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto-Like Comments</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Like new comments automatically</p>
              </div>
              <ToggleSwitch 
                checked={automationSettings.comments.likeComments}
                onChange={() => setAutomationSettings(prev => ({
                  ...prev,
                  comments: {
                    ...prev.comments,
                    likeComments: !prev.comments.likeComments
                  }
                }))}
              />
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-750">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Reply to Mentions</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Auto-reply when @mentioned</p>
              </div>
              <ToggleSwitch 
                checked={automationSettings.comments.replyToMentions}
                onChange={() => setAutomationSettings(prev => ({
                  ...prev,
                  comments: {
                    ...prev.comments,
                    replyToMentions: !prev.comments.replyToMentions
                  }
                }))}
              />
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-750">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Keyword Triggers</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full text-xs font-medium">
                  discount
                </span>
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full text-xs font-medium">
                  price
                </span>
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full text-xs font-medium">
                  shipping
                </span>
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full text-xs font-medium">
                  quality
                </span>
              </div>
              <button className="text-pink-550 text-sm font-medium flex items-center">
                <Plus size={14} className="mr-1" /> Add Keyword
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
          <button className="text-sm font-medium text-pink-550">View All</button>
        </div>
        
        <div className="space-y-4">
          <ActivityItem 
            icon={<ThumbsUp size={18} className="text-blue-500" />}
            title="Liked comment from @johndoe"
            description='"Love this product! Best purchase ever"'
            time="5 min ago"
          />
          <ActivityItem 
            icon={<MessageSquare size={18} className="text-pink-550" />}
            title="Replied to @sarahsmith"
            description='Thanks! We re glad you love it ❤️'
            time="30 min ago"
          />
          <ActivityItem 
            icon={<Zap size={18} className="text-green-500" />}
            title="Auto-reply to @mikewilson"
            description='"Our shipping takes 3-5 business days"'
            time="1 hour ago"
          />
        </div>
      </div>
    </div>
  );

  // Scheduler Tab
  const renderScheduler = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Scheduled Posts</h3>
          <button 
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-pink-550 to-purple-600 hover:from-pink-600 hover:to-purple-650 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium"
          >
            <Plus size={16} className="mr-1" /> New Post
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-150 dark:border-gray-750">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-750">
              {scheduledPosts.map(post => (
                <tr key={post.id}>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{post.content}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <Instagram className="mr-1 text-pink-550" size={14} />
                      {post.platform}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-800 dark:text-gray-200">{post.date}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{post.time}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      post.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-750">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-825 rounded-xl border border-gray-150 dark:border-gray-750 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Scheduling Settings</h3>
          <ToggleSwitch 
            checked={automationSettings.schedule.optimalTimes}
            onChange={() => setAutomationSettings(prev => ({
              ...prev,
              schedule: {
                ...prev.schedule,
                optimalTimes: !prev.schedule.optimalTimes
              }
            }))}
          />
        </div>
        
        {automationSettings.schedule.optimalTimes && (
          <div className="space-y-5">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Optimal Posting Times</h4>
              <div className="bg-gray-50 dark:bg-gray-775 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Based on your audience activity, we recommend:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Mon: 2 PM', 'Wed: 11 AM', 'Fri: 4 PM', 'Tue: 1 PM', 'Thu: 3 PM', 'Sat: 10 AM'].map((time, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-2.5 rounded-lg text-center text-sm font-medium">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-150 dark:border-gray-750">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={automationSettings.schedule.autoReschedule}
                  onChange={() => setAutomationSettings(prev => ({
                    ...prev,
                    schedule: {
                      ...prev.schedule,
                      autoReschedule: !prev.schedule.autoReschedule
                    }
                  }))}
                  className="mt-1 h-4 w-4 text-pink-550 rounded focus:ring-pink-550"
                />
                <div className="ml-3">
                  <label className="text-gray-800 dark:text-gray-200 font-medium">Auto-reschedule</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Automatically reschedule posts with low engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-850 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <Instagram className="text-pink-550 mr-2" size={28} />
                <span className="text-xl font-bold text-gray-800 dark:text-white">InstaAutomate</span>
              </div>
              
              <nav className="hidden md:flex md:ml-10 md:space-x-8">
                <button 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'dm' 
                      ? 'text-pink-550 bg-pink-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-775'
                  }`}
                  onClick={() => setActiveTab('dm')}
                >
                  DM Automation
                </button>
                <button 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'comments' 
                      ? 'text-pink-550 bg-pink-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-775'
                  }`}
                  onClick={() => setActiveTab('comments')}
                >
                  Comment Automation
                </button>
                <button 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'schedule' 
                      ? 'text-pink-550 bg-pink-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-775'
                  }`}
                  onClick={() => setActiveTab('schedule')}
                >
                  Post Scheduler
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-550 to-purple-600 flex items-center justify-center text-white font-bold mr-2">
                    U
                  </div>
                  <span className="hidden md:inline">User Account</span>
                  <ChevronDown className="ml-1" size={16} />
                </button>
              </div>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-775 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white dark:bg-gray-850 border-t border-gray-200 dark:border-gray-750">
        <div className="flex justify-around">
          <TabButton 
            icon={<MessageSquare size={20} />}
            label="DMs"
            active={activeTab === 'dm'}
            onClick={() => setActiveTab('dm')}
          />
          <TabButton 
            icon={<ThumbsUp size={20} />}
            label="Comments"
            active={activeTab === 'comments'}
            onClick={() => setActiveTab('comments')}
          />
          <TabButton 
            icon={<Calendar size={20} />}
            label="Schedule"
            active={activeTab === 'schedule'}
            onClick={() => setActiveTab('schedule')}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {activeTab === 'dm' && 'Direct Message Automation'}
            {activeTab === 'comments' && 'Comment Automation'}
            {activeTab === 'schedule' && 'Post Scheduling'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {activeTab === 'dm' && 'Automate your Instagram direct messages and save time'}
            {activeTab === 'comments' && 'Manage and automate responses to comments'}
            {activeTab === 'schedule' && 'Schedule your Instagram posts in advance'}
          </p>
        </div>
        
        {activeTab === 'dm' && renderDMAutomation()}
        {activeTab === 'comments' && renderCommentAutomation()}
        {activeTab === 'schedule' && renderScheduler()}
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-825 rounded-xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-150 dark:border-gray-750">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Schedule New Post</h3>
                <button 
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Post Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 min-h-[120px] text-gray-800 dark:text-gray-200"
                  placeholder="What do you want to post?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Caption & Hashtags</label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({...newPost, caption: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 min-h-[100px] text-gray-800 dark:text-gray-200"
                  placeholder="Add caption and hashtags..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newPost.scheduleDate}
                    onChange={(e) => setNewPost({...newPost, scheduleDate: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={newPost.scheduleTime}
                    onChange={(e) => setNewPost({...newPost, scheduleTime: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-775 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-150 dark:border-gray-750 flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreatePost(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-775"
              >
                Cancel
              </button>
              <button 
                onClick={handleSchedulePost}
                className="bg-gradient-to-r from-pink-550 to-purple-600 hover:from-pink-600 hover:to-purple-650 text-white px-5 py-2.5 rounded-lg font-medium"
              >
                Schedule Post
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const TabButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-3 w-full ${
      active 
        ? 'text-pink-550' 
        : 'text-gray-500 dark:text-gray-400'
    }`}
  >
    <span className="mb-1">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      className="sr-only peer" 
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-pink-550 peer-checked:to-purple-600"></div>
  </label>
);

const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start">
    <div className="w-9 h-9 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-550 mr-3">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-800 dark:text-gray-200">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</p>
    </div>
  </div>
);

export default InstagramAutomationDashboard;
