export class ReportService {
  static async getSalesReport() {
    return {
      totalSalesBDT: 485900,
      totalOrders: 42,
      averageOrderValue: 11569,
      deliveredOrders: 36,
      pendingOrders: 4,
      cancelledOrders: 2
    };
  }
}
