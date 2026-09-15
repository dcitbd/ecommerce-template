import React from 'react';
import { siteConfig } from '../../../config/siteConfig';

export const AdminFooter: React.FC = () => {
  return (
    <footer className="p-4 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
      Techno World BD Control Panel • Architect: {siteConfig.developer.name}
    </footer>
  );
};
