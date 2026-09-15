import React from 'react';

export const BulkUploadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full text-xs">
        <h3 className="font-bold text-sm mb-3">এক্সেল / সিএসভি বাল্ক আপলোড</h3>
        <input type="file" accept=".csv, .xlsx" className="mb-4" />
        <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded font-bold">আপলোড করুন</button>
      </div>
    </div>
  );
};
