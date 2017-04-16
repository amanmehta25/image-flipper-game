'use strict';
/**
 * @ngdoc services
 * @name merchantApp.services: ImageService
 * @description
 * # Images Service to get the images
 */

angular
    .module('imageFlipper')
    .factory('ImageService', [
        '$http',
        function($http) {

            function getImages() {
                return $http.get('json/images.json');
            }

            return {
                getImages: getImages
            };
        }
    ]);
