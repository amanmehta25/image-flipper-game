'use strict';

/**
 * @ngdoc function
 * @name imageFlipper.controller:ImageFlip
 * @description
 * # MainCtrl
 * Controller of the imageFlipper
 */
angular
    .module('imageFlipper')
    .controller('ImageFlip', [
        '$http', '$timeout', 'ImageService', 'PrizeService',
        function ($http, $timeout, ImageService, PrizeService) {
            var imageFlip = this,
                randomizedArray = [],
                moviesNames = [
                    'Tamasha',
                    'Bajirao Mastani',
                    'Ramleela',
                    'Xander Cage',
                    'Piku',
                    'Cocktail',
                    'Race'
                ],
                images,
                prizes;

            imageFlip.flippedImages = 0;
            imageFlip.numberOfGames = 0;
            imageFlip.isGameWon = false;

            ImageService.getImages().then(function (response) {
                imageFlip.images = response.data;
                images = angular.copy(imageFlip.images);
            });

            PrizeService.getPrizes().then(function (response) {
                imageFlip.prizes = response.data[0];
                prizes = angular.copy(imageFlip.prizes);
            });

            function randomizedArrayGenerator() {
                var onesCount = 0, randomNumber, i;
                for (i = 0; i < 41; i++) {
                    /**
                     * Getting a random integer between two values, inclusive
                     * minNumber, the minimum number you want to generate
                     * maxNumber, the maximum number you want to generate
                     * Random number generator -> Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
                     * We need to generate only 0 & 1. Keep maxNumber=1 & minNumber=0
                     * Random number generator reduces to Math.floor(Math.random() * 2);
                     */
                    randomNumber = Math.floor(Math.random() * 2);
                    if (randomNumber === 1) {
                        onesCount++;
                    }
                    if (onesCount < 14) {
                        randomizedArray.push(randomNumber);
                    } else {
                        randomizedArray.push(0);
                    }
                }
                randomizedArray.push(1);
            }
            randomizedArrayGenerator();

            function randomizedIndexGenerator() {
                /**
                 * Getting a random integer between two values, inclusive
                 * minNumber, the minimum number you want to generate
                 * maxNumber, the maximum number you want to generate
                 * Random number generator -> Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
                 * We need to generate index from 0 to 6. Keep maxNumber=6 & minNumber=0
                 * Random number generator reduces to Math.floor(Math.random() * 7);
                 */
                var randomNumber = Math.floor(Math.random() * 7);
                imageFlip.selectedMovieName = moviesNames[randomNumber];
                imageFlip.randomMovieName = moviesNames[randomNumber ? randomNumber - 1 : 6];
            }
            randomizedIndexGenerator();

            function restartGame() {
                angular.forEach(imageFlip.images, function(image) {
                    image.isFlipped = true;
                    image.movieName = '';
                });
                imageFlip.flippedImages = 0;
                imageFlip.numberOfGames++;
                randomizedIndexGenerator();
                imageFlip.isWinningGame = randomizedArray[imageFlip.numberOfGames] ? true : false;
            }

            imageFlip.isWinningGame = randomizedArray[imageFlip.numberOfGames] ? true : false;

            imageFlip.selectImage = function (image) {
                if (!image.isFlipped || imageFlip.flippedImages >= 2) {
                    return;
                }

                if (image.isFlipped) {
                    imageFlip.flippedImages++;
                    image.isFlipped = false;
                    if (imageFlip.isWinningGame || imageFlip.flippedImages === 1) {
                        image.movieName = imageFlip.selectedMovieName;
                    } else {
                        image.movieName = imageFlip.randomMovieName;
                    }
                }
                $timeout(function() {
                    if (imageFlip.flippedImages === 2) {
                        imageFlip.isGameEnds = true;
                        if (imageFlip.isWinningGame) {
                            if (imageFlip.prizes.tickets) {
                                imageFlip.prizes.tickets--;
                            } else if (imageFlip.prizes.mobile) {
                                imageFlip.prizes.mobile--;
                            } else {
                                imageFlip.prizes.bike--;
                            }
                            imageFlip.isGameWon = true;
                        } else if (!imageFlip.isWinningGame) {
                            imageFlip.isGameWon = false;
                        }
                        restartGame();
                    }
                }, 400);
            };

            imageFlip.resetGame = function () {
                imageFlip.isGameEnds = false;
                imageFlip.numberOfGames = 0;
                imageFlip.prizes = angular.copy(prizes);
            };
        }
    ]);
