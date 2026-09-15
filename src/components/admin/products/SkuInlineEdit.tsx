import React from 'react';

export const SkuInlineEdit: React.FC<{ sku: string }> = ({ sku }) => {
  return <span className="font-mono text-xs">{sku}</span>;
};
