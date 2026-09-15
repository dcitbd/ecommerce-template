export class CartService {
  static saveCart(items: any[]) {
    localStorage.setItem('twbd_cart_items', JSON.stringify(items));
  }
  static getCart(): any[] {
    return JSON.parse(localStorage.getItem('twbd_cart_items') || '[]');
  }
}
