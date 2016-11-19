class MyAppController {
  constructor(PetsService) {
    this.PetsService = PetsService;
  }
}

export default {
  template: require("./my-app.component.html"),
  controller: MyAppController
};
