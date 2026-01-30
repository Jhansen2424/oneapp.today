"use client";

import { motion } from "framer-motion";
import { Users, Phone, MessageSquare, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";

export function LeadsDashboard({ dashboardUrl = "dashboard.webaholics.com" }: { dashboardUrl?: string } = {}) {
  // Chart data - leads over time (last 7 days) - heights in pixels
  const chartData = [
    { day: "Mon", leads: 12, height: 35 },
    { day: "Tue", leads: 18, height: 52 },
    { day: "Wed", leads: 15, height: 44 },
    { day: "Thu", leads: 24, height: 70 },
    { day: "Fri", leads: 21, height: 61 },
    { day: "Sat", leads: 28, height: 82 },
    { day: "Sun", leads: 34, height: 100 },
  ];

  return (
    <div className="relative w-full">
      {/* Floating Lead Converted notification */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -top-3 right-8 z-30 rounded-xl border border-brand-500/40 shadow-2xl shadow-brand-500/20 bg-[#0d0d14]/95 backdrop-blur-xl px-4 py-2.5"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Lead Converted</p>
            <p className="text-xs text-brand-400">$4,500 deal</p>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d14]/90 backdrop-blur-xl shadow-2xl"
      >
        {/* Browser Chrome */}
        <div className="px-4 py-2.5 flex items-center gap-3 border-b border-white/5 bg-[#0a0a10]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
          </div>
          <div className="flex-1 max-w-md bg-[#1a1a24] rounded px-3 py-1 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            <span className="text-white/40 text-xs font-mono">{dashboardUrl}</span>
          </div>
        </div>

        {/* Dashboard Content - Horizontal Layout */}
        <div className="p-5">
          {/* Top Row: Stats */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: "Leads Today", value: "24", change: "+8", positive: true },
              { label: "Response Time", value: "< 2m", change: "-45%", positive: true },
              { label: "Close Rate", value: "34%", change: "+12%", positive: true },
              { label: "Revenue", value: "$47.2k", change: "+23%", positive: true },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/5"
              >
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                  <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Chart + Pipeline + Activity (horizontal) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Leads Chart - spans 5 cols */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="col-span-5 p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Leads This Week</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">+47%</span>
              </div>

              {/* Chart */}
              <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
                {chartData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${data.height * 0.8}px` }}
                      transition={{ duration: 0.8, delay: 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                      className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400 relative group cursor-pointer"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-white text-black text-[9px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {data.leads}
                      </div>
                    </motion.div>
                    <span className="text-[9px] text-neutral-500 mt-1.5">{data.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pipeline Value - spans 3 cols */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="col-span-3 p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-white">Pipeline</span>
              </div>
              <div className="text-2xl font-bold text-brand-400 mb-3">$127,400</div>
              <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="bg-brand-500 rounded-l"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "25%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="bg-blue-500"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  transition={{ duration: 1, delay: 1.3 }}
                  className="bg-violet-500"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  transition={{ duration: 1, delay: 1.4 }}
                  className="bg-amber-500 rounded-r"
                />
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-neutral-500">
                <span>New</span>
                <span>Qualified</span>
                <span>Proposal</span>
                <span>Close</span>
              </div>
            </motion.div>

            {/* Activity Feed - spans 4 cols */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="col-span-4 space-y-2"
            >
              {[
                { icon: Users, text: "New lead from website", time: "2m", color: "brand" },
                { icon: Phone, text: "AI answered call", time: "5m", color: "blue" },
                { icon: MessageSquare, text: "Follow-up sent", time: "12m", color: "violet" },
              ].map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activity.color === 'brand' ? 'bg-brand-500/20' :
                    activity.color === 'blue' ? 'bg-blue-500/20' :
                    'bg-violet-500/20'
                  }`}>
                    <activity.icon className={`w-3.5 h-3.5 ${
                      activity.color === 'brand' ? 'text-brand-400' :
                      activity.color === 'blue' ? 'text-blue-400' :
                      'text-violet-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{activity.text}</p>
                  </div>
                  <span className="text-[10px] text-neutral-500 shrink-0">{activity.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
