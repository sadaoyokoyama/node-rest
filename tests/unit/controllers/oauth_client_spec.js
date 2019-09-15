import OAuthClientController from '../../../src/controllers/oauth/client';
import sinon from 'sinon';
import OAuthClient from '../../../src/models/oauth/oauth_client';

describe('Controllers: OAuthClientController', () => {
    const defaultClient = [{
        __v: 0,
        _id: '56cb91bdc3464f14678934ca',
        clientId: 'id',
        clientSecret: 'secret',
        redirectUris: []
    }];

    const defaultRequest = {
        params: {}
    };

    describe('get() oauth clients', () => {
        it('should call send with a list of oauth clients', () => {
            const response = {
                send: sinon.spy()
            };

            OAuthClient.find = sinon.stub();
            OAuthClient.find.withArgs({}).resolves(defaultClient);

            const oAuthClientController = new OAuthClientController(OAuthClient);
            
            return oAuthClientController.get(defaultRequest, response)
                .then(() => {
                    sinon.assert.calledWith(response.send, defaultClient);
                });
        });
    });

    describe('create() oauth client', () => {
        it('should call send with a new oauth client', () => {
        
            const requestWithBody = Object.assign({}, { body: defaultClient[0] }, defaultRequest);
        
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            class fakeOAuthClient {
                save() {}
            }
        
            response.status.withArgs(201).returns(response);
            
            sinon.stub(fakeOAuthClient.prototype, 'save').withArgs().resolves();
            
            const oAuthClientController = new OAuthClientController(fakeOAuthClient);
        
            return oAuthClientController.create(requestWithBody, response)
                .then(() => {
                sinon.assert.calledWith(response.send);
            });
        });
    });
})

