/* eslint-disable no-undef */
import 'dotenv/config';
import logger from './logger.js';

let { PORT, MONGODB_URI, TEST_MONGODB_URI, NODE_ENV } = process.env;

logger.info('MONGODB_URI', process.env.MONGODB_URI);

if (NODE_ENV === 'test') {
  MONGODB_URI = TEST_MONGODB_URI;
}

export default { MONGODB_URI, PORT };
