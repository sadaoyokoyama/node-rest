class OAuthClientController {
    constructor(OAuthClient) {
        this.OAuthClient = OAuthClient;
    }

    get(req, res) {
        return this.OAuthClient.find({}).lean()
            .then(clients => res.send(clients));
    }

    create(req, res) {
        const oAuthClient = new this.OAuthClient(req.body);

        return oAuthClient.save()
            .then(() => res.status(201).send(oAuthClient))
            .catch(err => res.status(422).send(err.message));
    }
}

export default OAuthClientController;