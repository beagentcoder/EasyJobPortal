export default class UserModal {
  constructor(id, name,email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static add(name, email, password) {
    const user = new UserModal(users.length + 1, name, email, password);
    users.push(user);
    
  }
  static isValidUser(email, password) {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }
}

let users = [
  {
    id: 1,
    name: "iphone ",
    email: "abc@gmail.com",
    password: "1234",
  },
];
