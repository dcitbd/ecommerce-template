import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const DeveloperCredit: React.FC = () => {
  return (
    <div className="text-xs text-slate-400 text-center">
      কারিগরি সহযোগিতা বা ডেভেলপার:{' '}
      <a href={siteConfig.developer.profileUrl} target="_blank" rel="noreferrer" className="font-bold text-emerald-400 hover:underline">
        {siteConfig.developer.name}
      </a>
      , {siteConfig.developer.role} ({siteConfig.developer.companyUrl})
    </div>
  );
};
