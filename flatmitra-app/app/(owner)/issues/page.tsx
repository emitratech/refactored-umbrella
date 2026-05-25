"use client";

import React from "react";
import { IssueCard } from "@/components/cards/issue-card";
import { StatCard } from "@/components/cards/stat-card";
import { AlertTriangle, Clock, CheckCircle2, Search, Filter } from "lucide-react";

export default function IssuesManagementPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Issues Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and assign maintenance requests across properties.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search issues..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter size={16} className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Urgent" 
          value="12" 
          icon={<AlertTriangle size={20} className="text-danger" />} 
          subtitle="Require immediate attention"
          className="border-l-[4px] border-l-danger"
        />
        <StatCard 
          title="Open" 
          value="34" 
          icon={<AlertTriangle size={20} className="text-primary" />} 
          subtitle="Awaiting assignment"
          className="border-l-[4px] border-l-primary"
        />
        <StatCard 
          title="In Progress" 
          value="18" 
          icon={<Clock size={20} className="text-warning" />} 
          subtitle="Currently being handled"
          className="border-l-[4px] border-l-warning"
        />
        <StatCard 
          title="Resolved" 
          value="142" 
          icon={<CheckCircle2 size={20} className="text-success" />} 
          subtitle="Completed this month"
          className="border-l-[4px] border-l-success"
        />
      </div>

      {/* Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        <IssueCard
          id="REQ-4092"
          refNumber="#REQ-4092"
          priority="high"
          title="Major Water Leak in Lobby"
          description="Water is pooling near the main elevators on the ground floor. Needs immediate attention to prevent slip hazards and structural damage."
          property="Grand View Estates • Building A, Lobby"
          status="open"
          date="Reported 10 mins ago"
          onAssign={() => {}}
        />

        <IssueCard
          id="REQ-4088"
          refNumber="#REQ-4088"
          priority="medium"
          title="HVAC Filter Replacement"
          description="Routine maintenance request to replace the air filters in unit 4B as per the quarterly schedule."
          property="Pinehurst Commons • Unit 4B"
          status="assigned"
          date="Reported 2 days ago"
          assignee={{ name: "John Doe" }}
          onUpdate={() => {}}
        />

        <IssueCard
          id="REQ-4085"
          refNumber="#REQ-4085"
          priority="low"
          title="Broken Gate Latch"
          description="The pedestrian gate on the east side is not latching properly, compromising security."
          property="The Arbors • East Perimeter"
          status="resolved"
          date="Reported 5 days ago"
          assignee={{ name: "Mike R." }}
          updateText="Latch replaced and tested. Working smoothly now."
        />

        <IssueCard
          id="REQ-4095"
          refNumber="#REQ-4095"
          priority="high"
          title="Power Outage in South Wing"
          description="Entire south wing of Building B is without power. Elevators are down. Needs immediate electrician dispatch."
          property="Grand View Estates • Building B, South Wing"
          status="open"
          date="Reported 2 mins ago"
          onAssign={() => {}}
        />
        
        <IssueCard
          id="REQ-4081"
          refNumber="#REQ-4081"
          priority="medium"
          title="Gym Equipment Repair"
          description="Treadmill #3 display is malfunctioning and motor sounds loud."
          property="Sunrise Towers • Clubhouse"
          status="in-progress"
          date="Reported 1 week ago"
          assignee={{ name: "FitnessTech Serv" }}
          updateText="Parts ordered. Expected delivery by tomorrow."
          onUpdate={() => {}}
        />
      </div>
    </div>
  );
}
