class PetListController {
  constructor(PetsService, PostalCodeService) {
    "ngInject";
    this.PetsService = PetsService;
    this.PostalCodeService = PostalCodeService;
    this.pets = [];
    this.selectedPet = null;
    this.filter = "";
    this.loading = false;

    // initialize pet list
    this.loadAllPets();
  }

  selectPet(pet) {
    this.selectedPet = pet;
    this.petSelected({ pet: pet });
  }

  loadAllPets() {
    // todo: add infinite-scroll from "https://sroze.github.io/ngInfiniteScroll/index.html" to load more pets besides the initial list of 25 items.
    this.loading = true;

    this.PostalCodeService.getUsersZipCode()
      .then(postalCode => this.PetsService.getPets(postalCode))
      .then(pets => this.pets = pets)
      .catch(err => console.log("error while getting pets. todo: do something more with error.", err))
      .finally(() => this.loading = false);
  }

  criteriaMatch(name) {
    // filter all pets by name (case insensitve)
    // todo: be more effecient than using angularjs filter.
    return function (item) {
      return item.name.toUpperCase().indexOf(name.toUpperCase()) >= 0;
    };
  }
}

export default {
  bindings: {
    petSelected: "&"
  },
  template: require("./pets-list.component.html"),
  controller: PetListController
};
