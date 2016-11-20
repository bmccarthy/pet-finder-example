class PetDetailController {
  constructor() {
    "ngInject";
  }
}

export default {
  bindings: {
    pet: "<"
  },
  template: require("./pets-detail.component.html"),
  controller: PetDetailController
};
