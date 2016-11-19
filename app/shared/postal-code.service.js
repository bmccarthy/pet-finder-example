"use strict";

export default class PostalCodeService {
    constructor($http, $window, $q) {

        this.$http = $http;
        this.$window = $window;
        this.$q = $q;
    }

    getUsersZipCode() {
        const defaultPostal = "08534";
        let deferred = this.$q.defer();

        window.navigator.geolocation.getCurrentPosition((pos) => {

            this.$http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "&sensor=true")
                .then((res) => {
                    if (!res || !res.data || !res.data.results) {
                        deferred.resolve(defaultPostal);
                        console.error("unable to get geolocation. using default " + defaultPostal);
                        return;
                    }

                    let addressComponents = res.data.results[0].address_components;

                    // todo: probably a more robust way to get the postal code.
                    for (let i = 0; i < addressComponents.length; i++) {
                        for (let j = 0; j < addressComponents[i].types.length; j++) {
                            if (addressComponents[i].types[j] === "postal_code") {
                                deferred.resolve(addressComponents[i].long_name);
                                return;
                            }
                        }
                    }

                    console.error("unable to get geolocation. using default " + defaultPostal);
                    deferred.resolve(defaultPostal);

                });
        }, (err) => {
            console.error("unable to get geolocation. using default " + defaultPostal);
            deferred.resolve(defaultPostal);
        });

        return deferred.promise;
    }
}
