class PetDetailController {
  constructor(PetsService) {
    "ngInject";
    this.PetsService = PetsService;
  }
}

export default {
  template: require("./pets-detail.component.html"),
  controller: PetDetailController
};
