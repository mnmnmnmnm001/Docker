import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '/api';

const PRIORITY_COLOR = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const STATUS_LABEL = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };
const STATUS_COLOR = { todo: '#6366f1', 'in-progress': '#f59e0b', done: '#22c55e' };

function Badge({ text, color }) {
  return (
    <span style={{
      background: color + '22', color, border: `1px solid ${color}44`,
      borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600
    }}>{text}</span>
  );
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 12,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${PRIORITY_COLOR[task.priority]}`,
      transition: 'box-shadow 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600, color: '#1e293b' }}>{task.title}</h3>
          {task.description && <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: 13 }}>{task.description}</p>}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge text={STATUS_LABEL[task.status]} color={STATUS_COLOR[task.status]} />
            <Badge text={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} color={PRIORITY_COLOR[task.priority]} />
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
          <select value={task.status} onChange={e => onStatusChange(task._id, e.target.value)}
            style={{ fontSize: 12, padding: '4px 6px', borderRadius: 6, border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={() => onEdit(task)} style={btnStyle('#6366f1')}>Edit</button>
          <button onClick={() => onDelete(task._id)} style={btnStyle('#ef4444')}>Del</button>
        </div>
      </div>
    </div>
  );
}

function btnStyle(color) {
  return {
    background: color, color: '#fff', border: 'none', borderRadius: 6,
    padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 500
  };
}

function Modal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || { title: '', description: '', status: 'todo', priority: 'medium' });
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 440, maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ margin: '0 0 20px', color: '#1e293b' }}>{task?._id ? 'Edit Task' : 'New Task'}</h2>
        {[
          { label: 'Title *', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'text' }
        ].map(f => (
          <div key={f.name} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 4 }}>{f.label}</label>
            <input name={f.name} value={form[f.name]} onChange={handle}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Status', name: 'status', opts: ['todo', 'in-progress', 'done'] },
            { label: 'Priority', name: 'priority', opts: ['low', 'medium', 'high'] }
          ].map(f => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 4 }}>{f.label}</label>
              <select name={f.name} value={form[f.name]} onChange={handle}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}>
                {f.opts.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1).replace('-', ' ')}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ ...btnStyle('#94a3b8'), padding: '8px 18px' }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{ ...btnStyle('#6366f1'), padding: '8px 18px' }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.priority) params.priority = filter.priority;
      const res = await axios.get(`${API}/tasks`, { params });
      setTasks(res.data.data);
      setError('');
    } catch { setError('Failed to connect to backend. Is Docker running?'); }
    finally { setLoading(false); }
  }, [filter]);

  const fetchStats = useCallback(async () => {
    try { const res = await axios.get(`${API}/stats`); setStats(res.data.data); } catch {}
  }, []);

  const fetchHealth = useCallback(async () => {
    try { const res = await axios.get(`${API.replace('/api', '')}/health`); setHealth(res.data); } catch {}
  }, []);

  useEffect(() => { fetchTasks(); fetchStats(); fetchHealth(); }, [fetchTasks, fetchStats, fetchHealth]);

  const handleSave = async (form) => {
    try {
      if (form._id) await axios.put(`${API}/tasks/${form._id}`, form);
      else await axios.post(`${API}/tasks`, form);
      setModal(null); fetchTasks(); fetchStats();
    } catch (e) { alert(e.response?.data?.message || 'Error saving task'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks(); fetchStats();
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`${API}/tasks/${id}`, { status });
    fetchTasks(); fetchStats();
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#fff', padding: '20px 32px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>🐳 TaskManager</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.85 }}>Containerized with Docker · React + Node.js + MongoDB</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12 }}>
            {health && (
              <div>
                <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '4px 12px' }}>
                  ● {health.status} | MongoDB: {health.mongodb}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 32px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
          <StatCard label="Total Tasks" value={stats.total || 0} color="#6366f1" />
          <StatCard label="To Do" value={stats.todo || 0} color="#6366f1" />
          <StatCard label="In Progress" value={stats.inProgress || 0} color="#f59e0b" />
          <StatCard label="Done" value={stats.done || 0} color="#22c55e" />
          <StatCard label="High Priority" value={stats.highPriority || 0} color="#ef4444" />
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setModal({})} style={{ ...btnStyle('#6366f1'), padding: '8px 18px', fontSize: 14 }}>+ New Task</button>
          <select value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
            style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select value={filter.priority} onChange={e => setFilter(f => ({ ...f, priority: e.target.value }))}
            style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#64748b' }}>{tasks.length} task(s)</span>
        </div>

        {/* Error */}
        {error && <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px 16px', borderRadius: 10, marginBottom: 16, fontSize: 14 }}>{error}</div>}

        {/* Tasks */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <p>No tasks yet. Click "+ New Task" to get started.</p>
          </div>
        ) : (
          tasks.map(t => <TaskCard key={t._id} task={t} onEdit={setModal} onDelete={handleDelete} onStatusChange={handleStatusChange} />)
        )}
      </div>

      {modal !== null && <Modal task={modal._id ? modal : null} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
}
