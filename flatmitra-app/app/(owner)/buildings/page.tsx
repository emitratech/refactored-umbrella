"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/buttons/button";
import { Card } from "@/components/cards/card";
import { StatCard } from "@/components/cards/stat-card";
import { DataTable } from "@/components/tables/data-table";
import { Search, Plus, Filter, LayoutGrid, List as ListIcon, ChevronRight, Edit2, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/badges/status-badge";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BuildingsPage() {
  const { data: buildingsData, error, isLoading, mutate } = useSWR("/api/buildings", fetcher);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("");

  const buildings = buildingsData || [];

  // Set default selected building once data is loaded
  useEffect(() => {
    if (buildings.length > 0 && !selectedBuildingId) {
      setSelectedBuildingId(buildings[0].id);
    }
  }, [buildings, selectedBuildingId]);

  const selectedBuilding = buildings.find((b: any) => b.id === selectedBuildingId);
  const flats = selectedBuilding?.flats || [];

  const flatColumns = [
    { key: "unitNumber", label: "FLAT", width: "100px" },
    { key: "tenantName", label: "PRIMARY TENANT" },
    { key: "status", label: "STATUS", align: "center" as const },
    { key: "rentAmount", label: "MONTHLY RENT", align: "right" as const },
  ];

  const formattedFlats = flats.map((flat: any) => ({
    ...flat,
    tenantName: flat.tenantName || "-", // Fallback helper or user relation name
    status: <StatusBadge status={flat.status as any} />
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B48BD]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-150 p-6 max-w-md mx-auto mt-12 shadow-sm">
        <AlertTriangle className="mx-auto text-danger mb-4" size={40} />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Failed to load properties</h3>
        <p className="text-sm text-gray-500 mt-1">Please ensure your database connection is active and try again.</p>
        <Button onClick={() => mutate()} className="mt-6" variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Properties</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your buildings and individual units.</p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties, tenants..." 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button variant="secondary" icon={<Filter size={16} />}>All Buildings</Button>
            <div className="flex border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-[#1a1a1a]">
              <button className="p-2 text-primary bg-primary/10 rounded-l-md"><LayoutGrid size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><ListIcon size={18} /></button>
            </div>
            <Button variant="primary" icon={<Plus size={16} />}>Add Property</Button>
            <Button variant="secondary" icon={<Plus size={16} />}>Add Tenant</Button>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Buildings List */}
        <div className="w-full lg:w-[350px] flex flex-col flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Buildings ({buildings.length})</h2>
          
          <div className="space-y-3 overflow-y-auto pr-1 pb-4 flex-1">
            {buildings.length > 0 ? (
              buildings.map((building: any) => {
                const bFlats = building.flats || [];
                const occupiedCount = bFlats.filter((f: any) => f.status === "occupied").length;
                const vacantCount = bFlats.length - occupiedCount;
                return (
                  <div 
                    key={building.id}
                    onClick={() => setSelectedBuildingId(building.id)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer",
                      selectedBuildingId === building.id 
                        ? "bg-primary/5 border-primary shadow-sm" 
                        : "bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{building.name}</h3>
                      <ChevronRight size={18} className={selectedBuildingId === building.id ? "text-primary" : "text-gray-400"} />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{building.location}</p>
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                      <span className="text-success">{occupiedCount} Occupied</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className={vacantCount > 0 ? "text-danger" : ""}>{vacantCount} Vacant</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center text-gray-500 text-sm">
                No buildings configured.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Building Details */}
        {selectedBuilding ? (
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-transparent rounded-2xl p-0 lg:p-2">
            
            {/* Building Header */}
            <div className="flex justify-between items-start mb-6 bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-150 shadow-sm">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBuilding.name}</h2>
                  <StatusBadge status="active" />
                  <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">RESIDENTIAL</span>
                </div>
                <p className="text-sm text-gray-500">{selectedBuilding.location}</p>
              </div>
              <Button variant="secondary" size="sm" icon={<Edit2 size={14} />}>Edit Property</Button>
            </div>

            {/* Building KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard title="Total Flats" value={flats.length.toString()} subtitle="Units" />
              <StatCard title="Occupied" value={flats.filter((f: any) => f.status === "occupied").length.toString()} subtitle="Units" />
              <StatCard 
                title="Occupancy Rate" 
                value={`${flats.length > 0 ? Math.round((flats.filter((f: any) => f.status === "occupied").length / flats.length) * 100) : 0}%`} 
                progress={flats.length > 0 ? (flats.filter((f: any) => f.status === "occupied").length / flats.length) * 100 : 0} 
              />
              <div className="flex items-center justify-center h-full">
                <Button variant="tertiary" className="text-primary font-semibold">View Full Reports</Button>
              </div>
            </div>

            {/* Flat Directory */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Flat Directory</h3>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Filter</Button>
                  <Button variant="primary" size="sm" icon={<Plus size={14} />}>Add Flat</Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <DataTable 
                  columns={flatColumns} 
                  data={formattedFlats}
                  onAction={(action, row) => console.log(action, row)}
                  onRowClick={(row) => console.log('Navigate to flat', row)}
                />
              </div>
            </div>
            
          </div>
        ) : (
          <div className="flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center text-gray-500 self-center max-w-md mx-auto">
            Select a property from the sidebar to inspect flat directory and details.
          </div>
        )}
      </div>
    </div>
  );
}
