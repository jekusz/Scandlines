const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ScandlinesController = {
  get router() {
    const router = Router();

    router.use(inject('scandlinesSerializer'));

    router.get('/', inject('getTickets'), this.scandlines);
    router.get('/:id', inject('getUser'), this.dummy);

    return router;
  },

  dummy(req, res, next) {
    const { getUser, userSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getUser.outputs;

    getUser
      .on(SUCCESS, (user) => {
        res
          .status(Status.OK)
          .json(userSerializer.serialize(user));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getUser.execute(Number(req.params.id));
  },

  scandlines(req, res, next) {
    const { getTickets, scandlinesSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = getTickets.outputs;

    getTickets
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response)
          //.json(scandlinesSerializer.serialize(tickets));
      })
      .on(ERROR, next);

    getTickets.execute(req.body);
  },
};

module.exports = ScandlinesController;
