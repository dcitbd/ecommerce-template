import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';
import { UserService } from '../../../services/userService';
import { AdminUser } from '../../../types/user';

export const UserRoleTable: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    UserService.getUsers().then(setUsers);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <UserCheck className="w-4 h-4 mr-2 text-emerald-600" /> এডমিন ও টিম মেম্বারদের রোল ও এক্সেস
      </h3>
      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/40">
              <th className="py-2 px-3">নাম</th>
              <th className="py-2 px-3">ফোন</th>
              <th className="py-2 px-3">রোল</th>
              <th className="py-2 px-3">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2 px-3 font-bold">{u.name}</td>
                <td className="py-2 px-3 font-mono">{u.phone}</td>
                <td className="py-2 px-3 capitalize font-semibold text-emerald-600">{u.roleName}</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">সক্রিয়</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
