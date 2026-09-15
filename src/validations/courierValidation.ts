export function validateCourierBooking(payload: any): boolean {
  return !!payload.customerPhone && !!payload.deliveryArea && payload.collectionAmount >= 0;
}
