'use strict';
/**
 * @ngdoc overview
 * @name imageFlipper:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular
 */
angular
    .module('imageFlipper')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('master', {
                url: '/',
                templateUrl: 'modules/main.html'
            })
            .state('image-flip', {
                url: '/image-flip',
                controller: 'ImageFlip as ImageFlip',
                templateUrl: 'modules/image-flip/main.html',
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('');
    });
