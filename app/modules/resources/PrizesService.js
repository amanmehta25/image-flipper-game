'use strict';
/**
 * @ngdoc services
 * @name merchantApp.services: PrizeService
 * @description
 * # Prizes Service to get the prizes
 */

angular
    .module('imageFlipper')
    .factory('PrizeService', [
        '$http',
        function($http) {

            function getPrizes() {
                return $http.get('json/prizes.json');
            }

            return {
                getPrizes: getPrizes
            };
        }
    ]);
