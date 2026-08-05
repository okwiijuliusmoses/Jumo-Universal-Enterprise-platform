import React, { useState } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode;
}

export interface EnterpriseTableProps {
  title?: string;
  subtitle?: string;
  columns: ColumnDef[];
  data: any[];
  searchPlaceholder?: string;
  onRowClick?: (row: any) => void;
  exportFilename?: string;
  actions?: React.ReactNode;
}

export const EnterpriseTable: React.FC<EnterpriseTableProps> = ({
  title = "Enterprise Record Registry",
  subtitle = "Real-time records managed with FAAP double-entry consistency",
  columns,
  data,
  searchPlaceholder = "Search records...",
  onRowClick,
  exportFilename = "ueos_records.csv",
  actions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter data
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (val) => val && String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    const headers = columns.map((col) => col.label).join(",");
    const rows = filteredData.map((row) =>
      columns.map((col) => JSON.stringify(row[col.key] || "")).join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", exportFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="enterprise-table-container" className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden space-y-3 p-4 sm:p-5">
      
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {actions}
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="Export Records to CSV"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="text-slate-500 text-[11px] font-mono">
          Showing {paginatedData.length} of {filteredData.length} entries
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-200 font-mono border-b border-slate-800">
              {columns.map((col) => (
                <th key={col.key} className="px-3.5 py-2.5 font-bold uppercase tracking-wider text-[11px]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 italic text-xs">
                  No records match your filter criteria.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-3.5 py-2.5 text-slate-800">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
        <div className="font-mono text-[11px]">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-300 rounded text-slate-700 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-300 rounded text-slate-700 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
