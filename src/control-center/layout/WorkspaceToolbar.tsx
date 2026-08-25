import React, { useState } from 'react';
import { 
  ChevronRight, Search, Filter, Download, Printer, Share2, 
  RotateCw, Star, Clock, Sliders, Layout, PanelRight, Sparkles 
} from 'lucide-react';

export interface WorkspaceToolbarProps {
  moduleName?: string;
  breadcrumbs?: string[];
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onRefresh?: () => void;
  onToggleRightPanel?: () => void;
  isRightPanelOpen?: boolean;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({
  moduleName = 'Operational Workspace',
  breadcrumbs = ['Enterprise', 'Workspace'],
  onSearch,
  onFilter,
  onExport,
  onPrint,
  onShare,
  onRefresh,
  onToggleRightPanel,
  isRightPanelOpen = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  const recentPages = [
    'General Ledger Reconciliation',
    'Faculty Payroll & Tax Form 1099',
    'Patient EHR Admission Registry',
    'Church Tithes & FAAP Settlement',
    'AEGIS Access Controls Audit'
  ];

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-sans shrink-0 shadow-2xs">
      {/* Left: Breadcrumbs & Module Title & Star Favorite */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-1 text-slate-500 font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
              <span className={idx === breadcrumbs.length - 1 ? 'text-slate-900 font-bold' : 'hover:text-slate-700 cursor-pointer'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>

        <span className="text-slate-300 hidden sm:inline">|</span>

        {/* Favorite Star Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
            isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className="w-4 h-4 fill-current" />
        </button>

        {/* Recently Opened Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRecent(!showRecent)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded flex items-center gap-1 cursor-pointer"
            title="Recently Opened Workspaces"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Recent</span>
          </button>

          {showRecent && (
            <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50 text-xs">
              <div className="font-bold text-slate-800 pb-1.5 border-b border-slate-100 mb-1 px-2 text-[11px] uppercase tracking-wider text-slate-400">
                Recently Opened
              </div>
              <div className="space-y-0.5">
                {recentPages.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => setShowRecent(false)}
                    className="w-full text-left px-2 py-1.5 hover:bg-slate-50 rounded text-slate-700 truncate block font-medium"
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Quick Action Controls (Search, Filter, Export, Print, Share, Refresh, Right Panel Toggle) */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Workspace Quick Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Filter records..."
            className="w-36 md:w-48 pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all h-7"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilter}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded font-semibold text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
          title="Filter Data"
        >
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Filter</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded font-semibold text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
          title="Export Data"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Print Button */}
        <button
          onClick={onPrint}
          className="p-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded shadow-2xs cursor-pointer hidden sm:flex items-center justify-center"
          title="Print Workspace View"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="p-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded shadow-2xs cursor-pointer hidden sm:flex items-center justify-center"
          title="Share Workspace Link"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="p-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded shadow-2xs cursor-pointer flex items-center justify-center"
          title="Refresh Data"
        >
          <RotateCw className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-0.5" />

        {/* Right Panel Toggle Button */}
        <button
          onClick={onToggleRightPanel}
          className={`px-2.5 py-1 rounded border font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer ${
            isRightPanelOpen
              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title="Toggle Intelligent Context Side Panel"
        >
          <PanelRight className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">AI & Tasks</span>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceToolbar;
