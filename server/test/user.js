import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { describe, it } from 'mocha';

chai.use(chaiHttp);
chai.should();

const user = {
      first_name: 'Harera',
      last_name: 'kalex',
      email: 'hareraloston@gmail.com',
      password: 'butare',
      address: 'Rwanda',
    };

describe('signup', () => {
  it('User should be created successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
});