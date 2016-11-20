class MyAppController {
  constructor() {
    "ngInject";
    this.pet = null;
  }

  onPetChanged(selectedPet) {
    this.pet = selectedPet.pet;
  }
}

export default {
  template: require("./my-app.component.html"),
  controller: MyAppController
};
