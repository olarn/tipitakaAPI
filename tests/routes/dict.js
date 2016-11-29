'use strict'

// https://www.npmjs.com/package/supertest

const expect = require('chai').expect
const supertest = require('supertest');
const app = require('../../app')

describe('dict API', function() {
    it('get() thai2thai with "ทดสอบ" should return meaning of it', function(done) {
        const expectedHeader = 'ทดสอบ'
        const expectedTranslate = 'ก. ตรวจสอบเพื่อความถูกต้องแน่นอน เช่น ทดสอบเครื่องยนต์; (การศึกษา) สอบเพื่อวัดความรู้ความสามารถเป็นต้น เช่น ทดสอบความรู้ของนักเรียนด้วยการให้ลองปฏิบัติ.'
        const path = '/dict/thai2thai/' + encodeURIComponent("ทดสอบ")
        supertest(app)
            .get(path)
            .expect(200, 
                [{
                    head: expectedHeader,
                    translation: expectedTranslate 
                }],
                done)
    })
})