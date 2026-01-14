import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  LayoutDashboard,
  History,
  User,
  Search,
  PieChart as ChartIcon,
  X,
  CreditCard,
  ShoppingBag,
  Coffee,
  Car,
  Lightbulb,
  Building2,
  CheckCircle2,
  Scan,
  Camera,
  Gift,
  HeartPulse,
  Gamepad2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const chartData = [
  { name: 'Mon', amount: 45 },
  { name: 'Tue', amount: 52 },
  { name: 'Wed', amount: 38 },
  { name: 'Thu', amount: 65 },
  { name: 'Fri', amount: 48 },
  { name: 'Sat', amount: 70 },
  { name: 'Sun', amount: 42 },
];

const pieData = [
  { name: 'Food', value: 400, color: '#6366f1' },
  { name: 'Transport', value: 300, color: '#06b6d4' },
  { name: 'Shopping', value: 300, color: '#10b981' },
  { name: 'Rent', value: 800, color: '#f43f5e' },
];

const banks = [
  { name: 'Maybank', color: '#ffcc00', balance: '12,450.80' },
  { name: 'CIMB Bank', color: '#ff0000', balance: '5,200.00' },
  { name: 'RHB Bank', color: '#003399', balance: '1,800.00' },
  { name: 'Public Bank', color: '#cc0000', balance: '3,100.00' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [linkedBanks, setLinkedBanks] = useState([banks[0]]);
  const [statsType, setStatsType] = useState('weekly');
  const [isScanning, setIsScanning] = useState(false);

  // Prevention of background scroll logic
  useEffect(() => {
    // Since body is already overflow: hidden, we just manage the internal container if needed
    // But the current structure with flex: 1 and overflow-y: auto should be sufficient.
  }, [showAddModal, showBankModal]);

  const totalBalance = linkedBanks.reduce((acc, bank) => acc + parseFloat(bank.balance.replace(',', '')), 0);

  return (
    <div className="mobile-container">
      {/* Status Bar Space */}
      <div style={{ height: '44px' }} />

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
          >
            {/* Header */}
            <header style={{ padding: '0 24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700 }}>PocketHero</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Welcome back, Hafiz!</p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: 'var(--indigo-soft)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--primary)'
                }}>
                  <User size={24} />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div style={{ padding: '0 24px 100px 24px' }}>
              {/* Balance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  padding: '24px',
                  borderRadius: '24px',
                  color: 'white',
                  marginBottom: '24px',
                  boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ opacity: 0.9, fontSize: '14px', marginBottom: '8px' }}>Total Balance ({linkedBanks.length} Banks)</div>
                <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>RM {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowDownLeft size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>Income</div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>RM 4,200</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowUpRight size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>Expenses</div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>RM 1,850</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Monthly Summary Preview Card */}
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fef3c7', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d97706' }}>
                  <TrendingUp size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>JANUARY SPENDING</div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>RM 3,420.50</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 700 }}>-12.5%</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>vs last month</div>
                </div>
              </div>

              {/* Linked Banks Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 650 }}>Linked Banks</h3>
                  <button
                    onClick={() => setShowBankModal(true)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={16} /> Link Bank
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                  {linkedBanks.map((bank, i) => (
                    <motion.div
                      key={i}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flexShrink: 0,
                        width: '140px',
                        background: 'white',
                        padding: '16px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: bank.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                        <Building2 size={18} />
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{bank.name}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>RM {bank.balance}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Insights Section */}
              <div style={{
                background: 'var(--amber)',
                padding: '16px',
                borderRadius: '20px',
                marginBottom: '24px',
                color: 'white',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '12px' }}>
                  <Lightbulb size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Daily Tip</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>You've spent 15% less on Nasi Lemak this week. Keep it up!</div>
                </div>
              </div>

              {/* Categories / Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'white', padding: '16px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: 'var(--emerald)', marginBottom: '8px' }}><TrendingUp size={20} /></div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Savings</div>
                  <div style={{ fontSize: '18px', fontWeight: 600 }}>RM 2,100</div>
                </div>
                <div style={{ background: 'white', padding: '16px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: 'var(--rose)', marginBottom: '8px' }}><Wallet size={20} /></div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Debts</div>
                  <div style={{ fontSize: '18px', fontWeight: 600 }}>RM 450</div>
                </div>
              </div>

              {/* Recent Transactions Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 650 }}>Recent Activity</h3>
                  <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>See All</button>
                </div>

                {[
                  { name: 'Grab Food', cat: 'Food & Drinks', time: '2:30 PM', amount: '-RM 24.50', icon: <Coffee size={20} /> },
                  { name: 'Petronas Fuel', cat: 'Transport', time: '11:20 AM', amount: '-RM 50.00', icon: <Car size={20} /> },
                  { name: 'Salary Deposit', cat: 'Job', time: 'Yesterday', amount: '+RM 3,200.00', icon: <CreditCard size={20} />, pos: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '16px',
                      background: '#f8fafc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: item.pos ? 'var(--emerald)' : 'var(--text-muted)'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.cat} • {item.time}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: item.pos ? 'var(--emerald)' : 'var(--rose)' }}>{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 100px 24px', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Spending Analysis</h1>
              <div style={{ background: '#f1f5f9', padding: '4px', borderRadius: '12px', display: 'flex', gap: '4px' }}>
                {['weekly', 'monthly'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setStatsType(type)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: statsType === type ? 'white' : 'transparent',
                      color: statsType === type ? 'var(--primary)' : 'var(--text-muted)',
                      boxShadow: statsType === type ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>{statsType === 'weekly' ? 'Weekly' : 'Monthly'} Spending (RM)</h3>
              <div style={{ width: '100%', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? 'var(--primary)' : 'var(--indigo-soft)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>By Category</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '150px', height: '150px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                  {pieData.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', flex: 1 }}>{item.name}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{Math.round(item.value / 1800 * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}


        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 100px 24px', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700 }}>History</h1>
              <div style={{ padding: '8px', borderRadius: '12px', background: '#f1f5f9' }}>
                <Search size={20} color="var(--text-muted)" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
              {['All', 'Food', 'Transport', 'Rent', 'Shopping'].map((cat, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: i === 0 ? 'var(--primary)' : 'white',
                  color: i === 0 ? 'white' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid #f1f5f9',
                  whiteSpace: 'nowrap'
                }}>
                  {cat}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Today', 'Yesterday'].map((day, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2, 3, 4, 5].map((_, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <ShoppingBag size={18} color="var(--text-muted)" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>Aeon Big Market</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>10:30 AM</div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--rose)' }}>-RM 45.00</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 100px 24px', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '32px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '32px',
                  background: 'linear-gradient(135deg, var(--indigo-soft), #ffffff)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--primary)',
                  border: '4px solid white',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
                }}>
                  <User size={48} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  border: '3px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white'
                }}>
                  <Plus size={16} />
                </div>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: '16px' }}>Wan Hafizuddin</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>hafiz@glowcare.com</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Account Settings', icon: <User size={20} /> },
                { label: 'Payment Methods', icon: <CreditCard size={20} /> },
                { label: 'App Notifications', icon: <Search size={20} /> },
                { label: 'Security', icon: <Wallet size={20} /> },
                { label: 'Help Center', icon: <X size={20} /> },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  cursor: 'pointer'
                }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>{item.label}</span>
                  <div style={{ color: 'var(--text-muted)' }}>›</div>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: '24px',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #fee2e2',
              background: '#fef2f2',
              color: 'var(--rose)',
              fontWeight: 700,
              fontSize: '14px'
            }}>
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 100,
              }}
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                width: '100%',
                background: 'white',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                padding: '32px 24px 44px 24px',
                position: 'absolute',
                bottom: 0,
                zIndex: 101
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ width: '40px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto 24px auto' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Add Expense</h2>
                <button
                  onClick={() => {
                    setIsScanning(true);
                    setTimeout(() => setIsScanning(false), 2000);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: 'var(--indigo-soft)',
                    color: 'var(--primary)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <Scan size={18} /> {isScanning ? 'Scanning...' : 'Scan Receipt'}
                </button>
              </div>

              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginBottom: '24px',
                    padding: '24px',
                    borderRadius: '20px',
                    background: '#f8fafc',
                    border: '2px dashed var(--primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <Camera size={32} className="animate-pulse" style={{ color: 'var(--primary)' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Analyzing Receipt...</div>
                </motion.div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Amount</label>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)' }}>RM</span>
                  <input type="text" placeholder="0.00" autoFocus style={{ width: '100%', fontSize: '32px', fontWeight: 700, border: 'none', outline: 'none', color: 'var(--primary)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: <ShoppingBag size={20} />, label: 'Shop' },
                  { icon: <Coffee size={20} />, label: 'Food' },
                  { icon: <Car size={20} />, label: 'Travel' },
                  { icon: <Gamepad2 size={20} />, label: 'Play' },
                  { icon: <HeartPulse size={20} />, label: 'Health' },
                  { icon: <Gift size={20} />, label: 'Gifts' },
                  { icon: <Search size={20} />, label: 'Other' },
                ].map((cat, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
                      {cat.icon}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{cat.label}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowAddModal(false)}>Save Transaction</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Linked Banks Modal */}
      <AnimatePresence>
        {showBankModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 100,
              }}
              onClick={() => setShowBankModal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                width: '100%',
                maxHeight: '80%',
                background: 'white',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                padding: '32px 24px 44px 24px',
                position: 'absolute',
                bottom: 0,
                zIndex: 101,
                overflowY: 'auto'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ width: '40px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto 24px auto' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Link Bank Account</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Connect your accounts to automatically summarize and track your spending in Malaysia.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {banks.map((bank, i) => {
                  const isLinked = linkedBanks.some(b => b.name === bank.name);
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!isLinked) {
                          setLinkedBanks([...linkedBanks, bank]);
                        } else {
                          setLinkedBanks(linkedBanks.filter(b => b.name !== bank.name));
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        border: isLinked ? '2px solid var(--primary)' : '2px solid transparent'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: bank.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                        <Building2 size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{bank.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Online Banking</div>
                      </div>
                      {isLinked ? (
                        <CheckCircle2 size={24} color="var(--primary)" />
                      ) : (
                        <Plus size={24} color="var(--text-muted)" />
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%', marginTop: '32px' }}
                onClick={() => setShowBankModal(false)}
              >
                Confirm Connections
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '90px',
        background: 'white',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '20px',
        zIndex: 50
      }}>
        <div onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'dashboard' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <LayoutDashboard size={24} />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>Home</span>
        </div>
        <div onClick={() => setActiveTab('stats')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'stats' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <ChartIcon size={24} />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>Stats</span>
        </div>

        <div
          onClick={() => setShowAddModal(true)}
          style={{
            marginTop: '-50px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            cursor: 'pointer'
          }}
        >
          <Plus size={32} />
        </div>

        <div onClick={() => setActiveTab('history')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <History size={24} />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>History</span>
        </div>
        <div onClick={() => setActiveTab('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <User size={24} />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>Account</span>
        </div>
      </nav>

      {/* Background Scroll Blockers for consistency */}
      <style>{`
        .no-scroll { overflow: hidden !important; }
        ::-webkit-scrollbar { display: none; }
        .mobile-container { scrollbar-width: none; }
      `}</style>
    </div >
  );
}

export default App;
