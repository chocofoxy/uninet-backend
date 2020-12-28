import { Logger } from '@nestjs/common';
const morgan = require('morgan')

export function useRequestLogging(app) {
    const logger = new Logger('Request');
    app.use(
        morgan(function (tokens, req, res) {
            return [
              req.user ? req.user.email : 'Anonymous',
              tokens.method(req, res),
              tokens.url(req, res),
              "\x1b[37m" + tokens.status(req, res),
              tokens.res(req, res, 'content-length'), '-',
              "\x1b[33m" + Math.round(tokens['response-time'](req, res)) + 'ms' , 
            ].join(' ')
          }, {
            stream: {
                write: (message) => logger.log(message.replace('\n', '')),
            },
        }),
    );
}