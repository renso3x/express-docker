process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const organization = require('./fixtures/organization.json');

const base = 'http://localhost:3000';

describe('Unit Test API', () => {
  beforeEach(() => {
    this.get = sinon.stub(request, 'get');
    this.post = sinon.stub(request, 'post');
    this.delete = sinon.stub(request, 'delete');
  });

  afterEach(() => {
    request.get.restore();
    request.post.restore();
    request.delete.restore();
  });

  describe('GET /orgs/:orgName/members', () => {
    it('should return all member of a certain organization', done => {
      this.get.yields(
        null,
        organization.members.success.res,
        JSON.stringify(organization.members.success.body)
      );
      request.get(`${base}/orgs/Axa/members`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": [3 movie objects]}
        body.data.length.should.eql(2);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          '_id',
          'firstName',
          'lastName',
          'email',
          'password',
          'followers',
          'following',
          'organization',
          'avatarUrl'
        );
        // the first object should have the right value for name
        body.data[0].organization.should.eql('5dd35ff8a7e25636e3a9a504');
        done();
      });
    });
  });

  describe('GET /orgs/:orgName/comments', () => {
    it('should return all comments of a certain organization', done => {
      this.get.yields(
        null,
        organization.getComments.success.res,
        JSON.stringify(organization.getComments.success.body)
      );
      request.get(`${base}/orgs/Xendit/comments`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        body.comments.length.should.eql(3);
        // the first object in the data array should
        // have the right keys
        body.comments[0].should.include.keys('_id', 'comment', 'member');
        // the first object should have the right value for name
        body.comments[0]._id.should.eql('5dd373acf9d2544d0816c1e5');
        done();
      });
    });
  });

  describe('POST orgs/:orgName/comments', () => {
    it('should return success if a member', done => {
      const options = {
        body: {
          comment: 'This is my comment for xendit',
          memberId: '5dd35ff8a7e25636e3a9a508'
        },
        json: true,
        url: `${base}/orgs/Axa/comments`
      };
      const obj = organization.postComment.success;

      this.post.yields(null, obj.res, JSON.stringify(obj.body));

      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(200);

        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);

        body.message.should.eql('Successfully posted.');
        body.comment.should.include.keys('comment', 'member', 'organization');
        done();
      });
    });

    it('should throw an forbidden message if not a member when commenting', done => {
      const options = {
        body: {
          comment: 'This is my comment for xendit',
          memberId: '5dd35ff8a7e25636e3a9a508'
        },
        json: true,
        url: `${base}/orgs/Xendit/comments`
      };
      const obj = organization.postComment.forbidden;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));

      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(402);

        res.headers['content-type'].should.contain('application/json');

        body = JSON.parse(body);

        body.message.should.eql('Forbidden, not a member of this organization');
        should.exist(body.message);

        done();
      });
    });
  });

  describe('DELETE orgs/:orgName/comments', () => {
    it('should return deleted comment', done => {
      const options = {
        body: {},
        json: true,
        url: `${base}/orgs/Xendit/comment/5dd373acf9d2544d0816c1e5`
      };
      const obj = organization.delete.success;

      this.delete.yields(null, obj.res, JSON.stringify(obj.body));

      request.delete(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');

        body = JSON.parse(body);
        body.comment.should.include.keys('comment', 'deleted', 'deletedAt');

        done();
      });
    });
  });
});
