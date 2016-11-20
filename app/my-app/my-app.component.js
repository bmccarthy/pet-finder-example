class MyAppController {
  constructor(PetsService) {
    "ngInject";
    this.PetsService = PetsService;
  }
}

export default {
  template: require("./my-app.component.html"),
  controller: MyAppController
};
