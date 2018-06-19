const assert = require('chai').assert;
let foo='string';


// //Dummy function to impliment test
// function addUser(user){
//     return user;
// }
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