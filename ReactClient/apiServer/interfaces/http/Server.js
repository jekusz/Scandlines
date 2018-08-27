const expressServer = require('express');

class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.expressServer = expressServer();

    this.expressServer.disable('x-powered-by');
    this.expressServer.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const server = this.expressServer
        .listen(this.config.web.port, () => {
          const { port } = server.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
