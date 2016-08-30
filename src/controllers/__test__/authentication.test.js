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

  // stubs;
  let builderPrepareStub;

  describe('Method: checkAuth', () => {

    beforeEach(() => {
      req = {};
      res = {
        send: () => {},
      };
      next = () => {};

      sinon.spy(res, 'send');
      builderPrepareStub = sinon.stub(builder, 'prepare');
    });

    afterEach(() => {
      res.send.restore();
      builderPrepareStub.restore();
    });

    describe('when success', () => {

      beforeEach(() => {
        builderPrepareStub.returns(builderMock.prepare());
      });

      it('should prepare the life via a builder',  function() {
        authentication.check(req, res, next);
        expect(builderPrepareStub.calledOnce).to.be.true;
      });

      it('should send the data back',  function() {
        authentication.check(req, res, next);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.lastCall.args[0]).to.equal('tested code with success');
      });

    });

    describe('when builder fails', () => {

      beforeEach(() => {
        builderPrepareStub.returns(builderMock.prepareFail());
      });

      it('should send the data back',  function() {
        authentication.check(req, res, next);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.lastCall.args[0]).to.equal('tested code with failure');
      });

    });

  });

});
