"use client";

import React from "react";
import { Button } from "@/components/buttons/button";
import { StatusBadge } from "@/components/badges/status-badge";
import { Card } from "@/components/cards/card";
import { User, Phone, Mail, FileCheck, ShieldCheck, Download, AlertTriangle, Zap } from "lucide-react";
import Link from "next/link";

export default function FlatDetailPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/buildings" className="hover:text-primary transition-colors">Buildings</Link> 
          <span className="mx-2">›</span> 
          <Link href="/buildings/b1" className="hover:text-primary transition-colors">Gokuldham Heights</Link>
          <span className="mx-2">›</span> 
          <span className="text-gray-900 dark:text-gray-100">Unit 402</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Flat 402, Block A</h1>
            <StatusBadge status="active" label="OCCUPIED" />
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">Edit Details</Button>
            <Button variant="primary">Message Tenant</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Tenant & Maintenance Due (Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Tenant</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  AM
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Arjun Mehta</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FileCheck size={14} className="text-success mr-1.5" /> Lease ends: Oct 2024
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Phone size={14} className="mr-2 text-gray-400" /> +91 98765 43210
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Mail size={14} className="mr-2 text-gray-400" /> arjun.mehta@example.com
                </div>
              </div>
            </Card>

            <Card borderAccentColor="success">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Maintenance Due</h3>
              <div className="mb-2">
                <span className="text-[32px] font-bold text-gray-900 dark:text-white">₹24,500</span>
                <span className="text-gray-500 ml-1">/mo</span>
              </div>
              <div className="flex items-center text-sm text-success font-medium mb-6">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mr-2">
                  <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Paid for Oct 2023
              </div>
              <p className="text-sm text-gray-500 mb-4">Next due: 5th Nov 2023</p>
              <Button variant="primary" fullWidth>Pay Now</Button>
            </Card>
          </div>

          {/* Billing Ledger */}
          <Card 
            title="Billing Ledger" 
            actions={[
              <Button key="1" variant="tertiary" size="sm" icon={<Download size={14} />}>Download Ledger</Button>
            ]}
          >
            <div className="space-y-3 mt-2">
              {[
                { desc: "November Rent", date: "Due Nov 1", amount: "₹24,500", status: "pending" },
                { desc: "October Rent", date: "Due Oct 1", amount: "₹24,500", status: "paid" },
                { desc: "Maintenance Charge: Sink Repair", date: "Oct 15", amount: "₹1,200", status: "paid" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{tx.amount}</span>
                    <StatusBadge status={tx.status as any} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="tertiary" size="sm">View All Transactions</Button>
            </div>
          </Card>
          
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Lease Information */}
          <Card title="Lease Information">
            <div className="space-y-4 mt-2">
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Start Date</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">01 Jan 2023</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-sm text-gray-500">End Date</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">31 Dec 2023</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Security Deposit</span>
                <span className="text-sm font-medium text-success">₹75,000 (Held in Trust)</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-sm text-gray-500">Payment Freq</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">1st of Month</span>
              </div>
              
              <div className="pt-2">
                <Button variant="tertiary" size="sm" icon={<FileCheck size={14} />} className="px-0">
                  View Original Document (PDF)
                </Button>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="danger" fullWidth size="sm">Terminate</Button>
                <Button variant="secondary" fullWidth size="sm">Renew</Button>
              </div>
            </div>
          </Card>

          {/* Police Verification */}
          <Card>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-success" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                  Police Verification <span className="w-2 h-2 rounded-full bg-success ml-2"></span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">Ref ID: PV-8823-XYZ</p>
                <p className="text-xs text-gray-500">Verified on: Sep 15, 2023</p>
              </div>
            </div>
          </Card>

          {/* Active Issues */}
          <Card title="Active Issues">
            <div className="mt-2 border-l-[3px] border-danger pl-3 py-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Plumbing Leak in Master Bath</p>
                <span className="w-2 h-2 rounded-full bg-danger mt-1.5"></span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Reported Oct 12</p>
              <Button variant="tertiary" size="sm" className="px-0 mt-1 h-auto text-xs">Assign Plumber</Button>
            </div>
          </Card>

          {/* Meter Readings */}
          <Card title="Meter Readings">
            <div className="space-y-3 mt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-900 dark:text-white font-medium flex items-center">
                  <Zap size={14} className="mr-1.5 text-warning" /> Oct 2023
                </span>
                <div className="text-right">
                  <p className="font-bold">1,452 kWh</p>
                  <p className="text-xs text-gray-500">₹6,356 est.</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-gray-100 dark:border-gray-800 pt-2">
                <span className="text-gray-500 flex items-center">
                  <Zap size={14} className="mr-1.5 text-gray-400" /> Sep 2023
                </span>
                <div className="text-right">
                  <p className="font-medium text-gray-700 dark:text-gray-300">1,380 kWh</p>
                  <p className="text-[10px] text-success">Paid via Rent</p>
                </div>
              </div>
              <Button variant="secondary" fullWidth size="sm" className="mt-2">Update Reading</Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
