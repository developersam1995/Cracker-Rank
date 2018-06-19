const assert = require('chai').assert;
let foo='string';

describe("for some tests",function(){
    it("checking variable foo",function(){
        assert.typeOf(foo,'number');
    });
});

describe("length",function(){
    it("test",function(){
        assert.isOk(true);
    })
})