var ROOT_PATH = process.cwd();

var supertest = require('supertest');
var assert = require('chai').assert;

var app;

describe('integration test', function () {
  before(function (done) {
    app = require(ROOT_PATH);
    app.on('listening', done);
  });

  after(function (done) {
    app.close(done);
  });

  it('GET /', function (done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert.equal('rota default', res.text);
        done();
      });
  });

  it('GET /xpto', function (done) {
    supertest(app)
      .get('/xpto')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert.deepEqual({
          name: 'xpto'
        }, res.body);
        done();
      });
  });

  it('POST /xpto', function (done) {
    var payload = {
      name: 'test'
    };

    supertest(app)
      .post('/xpto')
      .send(payload)
      .expect(201)
      .end(function (err, res) {
        assert.isNull(err);
        assert.deepEqual(payload, res.body);
        done();
      });
  });
});
