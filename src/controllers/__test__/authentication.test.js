"use strict";

const sinon   = require('sinon');
const chai    = require('chai');
const expect  = chai.expect;

let authentication  = require('../authentication');

let builder         = require('../../modules/auth/builder');
let builderMock     = require('../../modules/auth/__test__/mocks/builder.mock');

let req, res, next;

describe('experiment checkAuth', () => {

  beforeEach(() => {
    req = {};
    res = {
      send: () => {},
    };
    next = () => {};

    sinon.spy(res, 'send');
    sinon.stub(builder, 'prepare', builderMock.prepare);
  });

  afterEach(() => {
    res.send.restore();
    builder.prepare.restore();
  });

  it('should prepare the life via a builder',  function() {
    authentication.check(req, res, next);
    expect(builder.prepare.calledOnce).to.be.true;
  });

  it('should send the data back',  function() {
    authentication.check(req, res, next);
    expect(res.send.calledOnce).to.be.true;
  });

});
