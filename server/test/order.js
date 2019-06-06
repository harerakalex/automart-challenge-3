import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { describe, it } from 'mocha';

chai.use(chaiHttp);
chai.should();

const order = {
      buyer_id: 2,
      car_id:  2,
      amount: 1300.33,
    };

const buyer = {
      email: 'hareraloston@gmail.com',
    };
const token = jwt.sign(buyer, 'automart-key', { expiresIn: '24hrs' });

describe('Make an order', () => {
  it('Order should be created successfully', (done) => {
    chai.request(server)
      .post('/api/v1/order')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('Order should not be created successfully if Authorization fails', (done) => {
    chai.request(server)
      .post('/api/v1/order')
      .send(order)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Order should not be created successfully if token is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/order')
      .set('Authorization', 'thisisfaketoken')
      .send(order)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
});

// unit test for updating price
const newPrice = {
  price: 1300.99
}

describe('Update the Price of Pending order', () => {
  it('The price updated successfully', (done) => {
    chai.request(server)
      .patch('/api/v1/order/1/price')
      .set('Authorization', token)
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