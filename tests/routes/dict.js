'use strict'

var expect = require('chai').expect
var request = require('request')
var dict = require('../../routes/dict/dict.js')

describe('dict API', function() {

    before(() => {
        
    })

    after(() => {

    })

    it('get() thai2thai with "ทดสอบ" should return meaning of it', function(done) {
        request('http://httpbin.org/ip', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            } else {
                console.log(error)
            }
            done()
        })
    })
})