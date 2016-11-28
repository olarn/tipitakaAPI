'use strict'

var expect = require('chai').expect
var http = require('http')
var dict = require('../../routes/dict/dict.js')

describe('dict API', function() {

    before(function(done) {
        var server = http.createServer(function(req, res){
        res.end('Hello World\n');
    })

    server.listen(3000);
        done()
    });

    after(function(done) {
        done()
    });

    it('get() thai2thai with "ทดสอบ" should return meaning of it', function() {
        http.get("http://localhost:3000/", function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(body).toEqual("test")
                done()
            })
        })
    })
})