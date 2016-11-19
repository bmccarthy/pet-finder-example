// third party dependencies
import angular from "angular";
import ngSanitize from "angular-sanitize";

// module dependencies
import MyAppComponent from "./my-app.component";
import PetsDetailComponent from "./pets-detail/pets-detail.component";
import PetListComponent from "./pets-list/pets-list.component";
import PetsService from "./shared/pets.service";
import PostalCodeService from "./shared/postal-code.service";
import ReplaceUrlFilter from "./shared/replace-url.filter";

angular.module("petsApp", [ngSanitize])
  .component("myApp", MyAppComponent)
  .component("petList", PetListComponent)
  .component("petDetail", PetsDetailComponent)
  .service("PostalCodeService", PostalCodeService)
  .service("PetsService", PetsService)
  .filter("replaceUrl", ReplaceUrlFilter);
