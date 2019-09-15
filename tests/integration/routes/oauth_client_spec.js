import OAuthClient from '../../../src/models/oauth/oauth_client';

describe('Routes: OAuthClient', () => {
    let request;

    before(() => {
        return setupApp()
            .then(app => {
                request = supertest(app);
            })
    });

    const defaultId = '56cb91bdc3464f14678934ca';

    const defaultClient = {
        clientId: 'id',
        clientSecret: 'secret',
        redirectUris: []
    };

    const expectedClient = {
        __v: 0,
        _id: defaultId,
        clientId: 'id',
        clientSecret: 'secret',
        redirectUris: []
    };

    beforeEach(() => {
        const oAuthClient = new OAuthClient(defaultClient);
        oAuthClient._id = defaultId;
        return OAuthClient.remove({})
        .then(() => oAuthClient.save());
    });

    afterEach(() => OAuthClient.remove({}));

    describe('GET /oauth_client', () => {
        it('should return a list of oauth clients', done => {
            request
                .get('/oauth_client')
                .end((err, res) => {
                    expect(res.body).to.eql([expectedClient]);
                    done(err);
                })
        })
    });

    describe('POST /oauth_client', () => {
        context('when posting a oauth client', () => {
            it('should return a new oauth client with status code 201', done => {
                const customId = '56cb91bdc3464f14678934ba';
        
                const newClient = Object.assign({}, { _id: customId, __v: 0 }, defaultClient);
        
                const expectedSavedClient = {
                    __v: 0,
                    _id: customId,
                    clientId: 'id',
                    clientSecret: 'secret',
                    redirectUris: []
                };
       
                request
                    .post('/oauth_client')
                    .send(newClient)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(201);
                        expect(res.body).to.eql(expectedSavedClient);
                        done(err);
                    });
            });
        });
    });
});