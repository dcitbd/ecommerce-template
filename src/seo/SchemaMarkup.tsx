import React from 'react';

export const SchemaMarkup: React.FC<{ schema: Record<string, any> }> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
