export const ORDER_STATUSES = [
  'Pending',
  'Accepted',
  'Confirmed',
  'Sent',
  'IN-Courier',
  'Delivered',
  'Cancelled',
  'Returned'
] as const;

export const ORDER_STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800 border-amber-300',
  Accepted: 'bg-blue-100 text-blue-800 border-blue-300',
  Confirmed: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Sent: 'bg-purple-100 text-purple-800 border-purple-300',
  'IN-Courier': 'bg-cyan-100 text-cyan-800 border-cyan-300',
  Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Cancelled: 'bg-rose-100 text-rose-800 border-rose-300',
  Returned: 'bg-red-100 text-red-800 border-red-300',
};
