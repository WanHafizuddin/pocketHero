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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="glass"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  padding: '28px',
                  borderRadius: '32px',
                  color: 'white',
                  marginBottom: '28px',
                  boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ position: 'absolute', left: '-20px', bottom: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ opacity: 0.9, fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total Balance ({linkedBanks.length} Banks)</div>
                <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '28px', letterSpacing: '-0.02em' }}>RM {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowDownLeft size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 600 }}>Income</div>
                      <div style={{ fontSize: '15px', fontWeight: 700 }}>RM 4,200</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowUpRight size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 600 }}>Expenses</div>
                      <div style={{ fontSize: '15px', fontWeight: 700 }}>RM 1,850</div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 110px 24px', overflowY: 'auto' }}
          >
            <div style={{ padding: '24px 0', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 10, marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>Analytics</h1>
                <div style={{ background: 'var(--indigo-soft)', padding: '5px', borderRadius: '16px', display: 'flex', gap: '4px' }}>
                  {['weekly', 'monthly'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setStatsType(type)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        background: statsType === type ? 'white' : 'transparent',
                        color: statsType === type ? 'var(--primary)' : 'var(--text-muted)',
                        boxShadow: statsType === type ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{statsType === 'weekly' ? 'Weekly' : 'Monthly'} Trend</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>RM / Day</div>
                </div>
                <div style={{ width: '100%', height: '220px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                      <Tooltip
                        cursor={{ fill: '#f8fafc', radius: 8 }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                      />
                      <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={24}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 5 ? 'var(--primary)' : 'var(--indigo-soft)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: 'white', padding: '24px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Spending by Category</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '140px', height: '140px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pieData.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }} />
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', flex: 1, fontWeight: 500 }}>{item.name}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>{Math.round(item.value / 1800 * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Added a recommendation card for extra "wow" */}
              <div style={{
                background: 'linear-gradient(135deg, #10b98120 0%, #05966910 100%)',
                padding: '20px',
                borderRadius: '24px',
                border: '1px solid #10b98130',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--emerald)', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.1)' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#065f46' }}>Saving Opportunity</div>
                  <div style={{ fontSize: '12px', color: '#047857' }}>Switching to home-cooked meals could save you ~RM250 this month.</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}


        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 110px 24px', overflowY: 'auto' }}
          >
            <div style={{ padding: '24px 0', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 10, marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>Activity</h1>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
                  <Search size={22} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
              {['All', 'Food', 'Transport', 'Rent', 'Shopping', 'Health', 'Travel'].map((cat, i) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '16px',
                    background: i === 0 ? 'var(--primary)' : 'white',
                    color: i === 0 ? 'white' : 'var(--text-muted)',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: '1px solid #f1f5f9',
                    boxShadow: i === 0 ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {['Today', 'Yesterday'].map((day, i) => (
                <div key={i}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Grab Food', icon: <Coffee size={20} />, time: '12:45 PM', amount: '-RM 32.00', color: '#fef3c7', iconCol: '#d97706' },
                      { name: 'Aeon Big', icon: <ShoppingBag size={20} />, time: '10:30 AM', amount: '-RM 156.40', color: '#dcfce7', iconCol: '#16a34a' },
                      { name: 'Petronas', icon: <Car size={20} />, time: '08:15 AM', amount: '-RM 60.00', color: '#e0f2fe', iconCol: '#0284c7' },
                    ].map((item, j) => (
                      <motion.div
                        key={j}
                        whileHover={{ x: 4 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '12px', borderRadius: '20px', border: '1px solid #f8fafc' }}
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: item.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: item.iconCol }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{item.time}</div>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--rose)' }}>{item.amount}</div>
                      </motion.div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 110px 24px', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', marginBottom: '40px' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '36px',
                  background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--primary)',
                  border: '4px solid white',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.06)'
                }}>
                  <User size={54} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  border: '3px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                }}>
                  <Plus size={18} />
                </div>
              </motion.div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '20px', letterSpacing: '-0.02em' }}>Wan Hafizuddin</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>hafiz@glowcare.com</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Account Settings', icon: <User size={20} />, color: '#eef2ff' },
                { label: 'Payment Methods', icon: <CreditCard size={20} />, color: '#ecfdf5' },
                { label: 'Security & Privacy', icon: <Wallet size={20} />, color: '#fff7ed' },
                { label: 'Help & Support', icon: <X size={20} />, color: '#fef2f2' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px',
                    background: 'white',
                    borderRadius: '24px',
                    border: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: item.color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--primary)'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ flex: 1, fontWeight: 700, fontSize: '15px' }}>{item.label}</span>
                  <div style={{ color: '#cbd5e1', fontWeight: 800 }}>›</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '32px',
                padding: '18px',
                borderRadius: '24px',
                border: 'none',
                background: '#fef2f2',
                color: 'var(--rose)',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign Out
            </motion.button>
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
        height: '100px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(241, 245, 249, 0.8)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '30px',
        zIndex: 50,
        boxShadow: '0 -10px 40px rgba(0,0,0,0.03)'
      }}>
        <div onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', color: activeTab === 'dashboard' ? 'var(--primary)' : '#94a3b8', transition: 'all 0.3s ease' }}>
          <LayoutDashboard size={22} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
          <span style={{ fontSize: '11px', fontWeight: 800 }}>Home</span>
        </div>
        <div onClick={() => setActiveTab('stats')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', color: activeTab === 'stats' ? 'var(--primary)' : '#94a3b8', transition: 'all 0.3s ease' }}>
          <ChartIcon size={22} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
          <span style={{ fontSize: '11px', fontWeight: 800 }}>Stats</span>
        </div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddModal(true)}
          style={{
            marginTop: '-45px',
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 12px 24px rgba(79, 70, 229, 0.4)',
            cursor: 'pointer'
          }}
        >
          <Plus size={32} strokeWidth={3} />
        </motion.div>

        <div onClick={() => setActiveTab('history')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', color: activeTab === 'history' ? 'var(--primary)' : '#94a3b8', transition: 'all 0.3s ease' }}>
          <History size={22} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
          <span style={{ fontSize: '11px', fontWeight: 800 }}>History</span>
        </div>
        <div onClick={() => setActiveTab('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', color: activeTab === 'profile' ? 'var(--primary)' : '#94a3b8', transition: 'all 0.3s ease' }}>
          <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span style={{ fontSize: '11px', fontWeight: 800 }}>Account</span>
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
