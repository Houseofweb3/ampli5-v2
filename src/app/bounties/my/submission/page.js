import BountiesList from '@/components/BountiesList';
import RequireAuth from '@/components/ProtectedAuth';
import React from 'react';

export default function page() {
  return (
    <RequireAuth>
      <BountiesList
        vector="/pattern/Vector2.png"
        title="My Submissions"
        type="Submissions"
      ></BountiesList>
    </RequireAuth>
  );
}
