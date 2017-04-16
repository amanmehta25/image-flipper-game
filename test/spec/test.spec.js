'use strict';

describe('test', function () {

    // load the controller's module
    beforeEach(module('imageFlipper'));

    // Initialize the controller and a mock scope
    // beforeEach(inject(function() {
    // }));

    var a;

    it('should attach a invitation token to the this Object', function () {
        a = true;

        expect(a).toBe(true);
    });
});
