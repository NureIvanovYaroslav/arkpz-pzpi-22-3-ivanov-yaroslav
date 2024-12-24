module.exports = class UserDto {
  id;
  email;
  name;
  birthDate;
  height;
  weight;
  country;
  gender;
  device;
  roles;
  notifications;
  goals;
  userFitnessStudios;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.name = model.name;
    this.birthDate = model.birthDate;
    this.height = model.height;
    this.weight = model.weight;
    this.country = model.country;
    this.gender = model.gender;
    this.device = model.device;
    this.roles = model.roles;
    this.notifications = model.notifications;
    this.goals = model.goals;
    this.userFitnessStudios = model.userFitnessStudios;
  }
};
