export class WishlistService {
  static getWishlist(): any[] {
    return JSON.parse(localStorage.getItem('twbd_wishlist') || '[]');
  }
}
