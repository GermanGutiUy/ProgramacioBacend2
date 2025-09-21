export default class UserDTO {
  constructor(user = {}) {
    this.id = user._id?.toString ? user._id.toString() : user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.cart = user.cart || null;
    // NO incluimos password, reset tokens ni datos sensibles
  }
}
