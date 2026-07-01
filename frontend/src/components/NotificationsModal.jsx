import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X, CheckCheck, Loader2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

const typeIcon = (message) => {
  if (message?.toLowerCase().includes('liked')) return '❤️';
  if (message?.toLowerCase().includes('following')) return '👤';
  if (message?.toLowerCase().includes('public') || message?.toLowerCase().includes('approved')) return '🎉';
  if (message?.toLowerCase().includes('published')) return '🚀';
  return '🔔';
};

const NotificationsModal = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchAll = useCallback(async (p = 1) => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/notifications?limit=15&page=${p}`, { headers: authHeaders });
      setNotifications(data.notifications || []);
      setTotalPages(data.pages || 1);
      setUnreadCount(data.unreadCount || 0);
      setPage(p);
    } catch (err) {
      console.error('Failed to fetch all notifications', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isOpen) fetchAll(1);
  }, [isOpen, fetchAll]);

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${BASE_URL}/api/notifications/read-all`, {}, { headers: authHeaders });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch { /* silent */ }
  };

  const markOneAsRead = async (notifId) => {
    try {
      await axios.patch(`${BASE_URL}/api/notifications/${notifId}/read`, {}, { headers: authHeaders });
      setNotifications(prev => prev.map(n => n._id === notifId ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* silent */ }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notif-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          <motion.div
            key="notif-modal-panel"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-lg glass border border-zinc-700/60 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
                  <Bell className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-none">All Notifications</h2>
                  {unreadCount > 0 && (
                    <p className="text-xs text-zinc-400 mt-0.5">{unreadCount} unread</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="text-5xl mb-4">🔔</div>
                  <p className="text-white font-semibold mb-1">You're all caught up!</p>
                  <p className="text-zinc-400 text-sm">Notifications will appear here when someone follows you, likes your project, or when your project goes public.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800/50">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => !notif.isRead && markOneAsRead(notif._id)}
                      className={`flex items-start gap-3.5 px-5 py-4 cursor-pointer transition-colors hover:bg-zinc-800/30 ${!notif.isRead ? 'bg-indigo-500/5 border-l-2 border-indigo-500/50' : ''}`}
                    >
                      {/* Icon */}
                      <span className="text-xl mt-0.5 shrink-0">{typeIcon(notif.message)}</span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${notif.isRead ? 'text-zinc-400' : 'text-zinc-100 font-medium'}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">{timeAgo(notif.createdAt)}</p>
                      </div>

                      {/* Read indicator */}
                      {notif.isRead
                        ? <Check size={14} className="shrink-0 text-zinc-700 mt-1" />
                        : <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1.5" />
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-700/50">
                <button
                  disabled={page <= 1}
                  onClick={() => fetchAll(page - 1)}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className="text-xs text-zinc-500">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => fetchAll(page + 1)}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;
