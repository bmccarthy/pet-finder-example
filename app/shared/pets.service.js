export default class PetsService {
  constructor($http, $sce, $window, $q) {
    "ngInject";
    this.$http = $http;
    this.$sce = $sce;
    this.$q = $q;

    this.baseUrl = "http://api.petfinder.com/";
    this.apiKey = "97e9d4d64f402c353394e706467fcafd";
    this.selectedPet = null;
  }

  getPets(zip) {
    let queryParam = [];
    queryParam.push("key=" + this.apiKey);
    queryParam.push("&callback=JSON_CALLBACK");
    queryParam.push("format=json");
    queryParam.push("animal=dog");
    queryParam.push("location=" + zip);

    let queryString = queryParam.join("&");

    let url = `${this.baseUrl}/pet.find?${queryString}`;

    return this.$http.jsonp(url)
      .then((resp) => resp.data.petfinder.pets.pet.map(c => {
        // cleanup data from service before returning to application.

        let pet = {
          name: c.name.$t,
          sex: c.sex.$t,
          size: c.size.$t,
          description: c.description.$t,
          age: c.age.$t,
          id: c.id.$t,
          breeds: [],
          photos: []
        };

        if (Array.isArray(c.breeds.breed)) {
          pet.breeds = c.breeds.breed.map(breed => breed.$t);
        } else {
          pet.breeds = [c.breeds.breed.$t];
        }

        if (c.media && c.media.photos && c.media.photos.photo) {

          // arrays come across as an object if only 1 item.  and as an array if it is >1 item.
          if (Array.isArray(c.media.photos.photo)) {
            // todo: current logic only shows "x" size images. update this logic to take the largest size per image.
            // example if it only has small size images, use them.
            pet.photos = c.media.photos.photo.filter(photo => photo["@size"] === "x").map(photo => photo.$t);
          } else {
            pet.photos = [c.media.photos.photo.$t];
          }
        }

        return pet;
      }));

    // todo: put in error handling when http call fails for getting pets (or any other api call here)
  }

  // todo: consider separating out the interaction with the petfinder api and the handling of state of the app (storing the current selected pet)
  selectPet(pet) {
    this.selectedPet = pet;
    console.log("selected pet", this.selectedPet);
  }

  getCurrentPet() {
    return this.selectedPet;
  }
}
