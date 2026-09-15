export function validatePayment(amount: number, method: string): boolean {
  return amount > 0 && !!method;
}
