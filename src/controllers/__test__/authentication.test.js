"use strict";

const sinon   = require('sinon');
const chai    = require('chai');
const expect  = chai.expect;

// tested controller
let authentication  = require('../authentication');

// dependencies
let builder         = require('../../modules/auth/builder');
let builderMock     = require('../../modules/auth/__test__/mocks/builder.mock');

describe('Controller: authentication', () => {

  // inputs & outputs
  let req, res, next;

  let sandbox;

  describe('Method: checkAuth', () => {

    beforeEach(() => {
      sandbox = sinon.sandbox.create();

      req = {};
      res = {
        send: sandbox.stub().returns({}),
      };
      next = () => {};

      builder.prepare = sandbox.stub().returns(builderMock.prepare());
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should prepare the life via a builder',  function() {
      authentication.check(req, res, next);
      expect(builder.prepare.calledOnce).to.be.true;
    });

    it('should send the data back',  function() {
      authentication.check(req, res, next);
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.lastCall.args[0]).to.equal('tested code with success');
    });

    describe('when builder fails', () => {

      beforeEach(() => {
        builder.prepare = sandbox.stub().returns(builderMock.prepareFail());
      });

      it('should send the data back',  function() {
        authentication.check(req, res, next);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.lastCall.args[0]).to.equal('tested code with failure');
      });

    });

  });

});
