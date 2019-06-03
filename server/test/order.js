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

describe('signup', () => {
  it('Order should be created successfully', (done) => {
    chai.request(server)
      .post('/api/v1/order')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
});

