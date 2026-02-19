import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Search, Edit, Trash2, FileText, Plus, Printer, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenericPage = ({ title, inputs = [], isReport = false }) => {
  const { t, isRTL } = useOutletContext(); 

  // --- PRINT FUNCTION ---
  const handlePrint = () => window.print();

  // --- PDF FUNCTION ---
  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 20);
    doc.autoTable({
      startY: 30,
      head: [inputs],
      body: [['Sample Data 1', 'Sample Data 2', 'Sample Data 3']], // Replace with real data in production
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto print:w-full print:max-w-none">
      
      {/* 1. INPUT FORM (Hidden on Print & Reports) */}
      {!isReport && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden print:hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex justify-between items-center text-white">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Plus size={18} className="text-blue-400" /> {title}
            </h1>
            <span className="text-xs text-slate-400 bg-white/10 px-2 py-1 rounded">
              {isRTL ? 'نیا ریکارڈ' : 'New Entry'}
            </span>
          </div>
          <div className="p-6">
            <div className={`grid gap-5 md:grid-cols-${inputs.length > 3 ? '4' : '3'} sm:grid-cols-2`}>
              {inputs.map((field, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wide">
                    {t[field.toLowerCase().replace(/ /g, '')] || field}
                  </label>
                  <input 
                    type={field.toLowerCase().includes('date') ? 'date' : 'text'}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm text-slate-700 bg-slate-50 focus:bg-white"
                    placeholder={field} 
                  />
                </div>
              ))}
            </div>
            <div className={`mt-6 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded shadow-lg shadow-blue-500/20 transition flex items-center gap-2 font-medium text-sm">
                <Save size={16} /> {t.save || 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DATA TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden print:border-none print:shadow-none">
        
        {/* Toolbar (Search + Print/PDF) */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            {isReport && <FileText size={20} className="text-blue-600" />}
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">
              {isReport ? title : (t.records || 'Records')}
            </h3>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className={`absolute top-2.5 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} size={14} />
              <input 
                className={`w-full pl-9 pr-4 py-2 rounded-full border border-slate-300 text-xs focus:outline-none focus:border-blue-500 transition-all`} 
                placeholder={t.search || 'Search...'} 
              />
            </div>
            
            {/* Export Actions */}
            <div className="flex gap-1 border-l border-slate-300 pl-3">
              <button onClick={handlePrint} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded" title="Print">
                <Printer size={18} />
              </button>
              <button onClick={handlePDF} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Download PDF">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Print Header (Visible only on print) */}
        <div className="hidden print:block p-6 text-center">
          <h2 className="text-2xl font-bold">Cage Master</h2>
          <p className="text-sm text-slate-500">{title} Report</p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-xs">
              <tr>
                {inputs.map((f, i) => (
                  <th key={i} className={`px-6 py-3 border-b border-slate-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t[f.toLowerCase().replace(/ /g, '')] || f}
                  </th>
                ))}
                {!isReport && <th className="px-6 py-3 border-b border-slate-200 text-center print:hidden">{t.actions || 'Action'}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-blue-50 transition-colors group">
                {inputs.map((col, j) => (
                  <td key={j} className={`px-6 py-3 text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {j === 0 ? <span className="font-medium text-slate-900">Sample Data</span> : '--'}
                  </td>
                ))}
                {!isReport && (
                  <td className="px-6 py-3 text-center print:hidden">
                    <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 hover:bg-blue-100 p-1.5 rounded transition"><Edit size={14}/></button>
                      <button className="text-red-600 hover:bg-red-100 p-1.5 rounded transition"><Trash2 size={14}/></button>
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;