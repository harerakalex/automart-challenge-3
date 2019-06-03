import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { describe, it } from 'mocha';

chai.use(chaiHttp);
chai.should();

// if all field not completed will not post a car.
const newCar = {
      owner: 2,
      manufacture: 'toyota',
      model: 'Corolla',
      price: 2000.01,
      state: 'new',
      body_type: 'Pick up',
      descriptios: 'brand new car 2019'
    };
describe('Post Ads', () => {
  it('New car it should not be created successfully', (done) => {
    chai.request(server)
      .post('/api/v1/car')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

// unit test for updating price
const newPrice = {
  price: 1300.99
}

describe('Update the Price of Posted Ads', () => {
  it('New price  successfully', (done) => {
    chai.request(server)
      .patch('/api/v1/car/1/price')
      .send(newPrice)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});

// unit test for updating status
const newStatus = {
  status: 'sold'
}

describe('Mark car as sold', () => {
  it('Status should be updated successfully', (done) => {
    chai.request(server)
      .patch('/api/v1/car/1/status')
      .send(newStatus)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});