import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, QrCode, Award } from "lucide-react";

export const AlumniIdentityWallet: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Digital ID Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-200 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <h4 className="font-bold text-lg text-indigo-300 flex items-center gap-2"><CreditCard /> Digital Alumni Card</h4>
          <QrCode className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
          <div>
            <p className="text-xl font-bold">John Doe</p>
            <p className="text-slate-600">JUMO-ALU-2026-000045</p>
          </div>
        </div>
      </div>

      {/* Badges & Credentials */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h4 className="font-bold mb-6 text-indigo-300 flex items-center gap-2"><Award /> Verified Credentials</h4>
        <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <ShieldCheck className="text-emerald-400" />
                <p className="text-sm">BSc. Computer Science - Verified</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Award className="text-amber-400" />
                <p className="text-sm">Leadership Badge - Active</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};
