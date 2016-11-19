class PetDetailController {
  constructor(PetsService) {
    this.PetsService = PetsService;
  }
}

export default {
  template: require("./pets-detail.component.html"),
  controller: PetDetailController
};
