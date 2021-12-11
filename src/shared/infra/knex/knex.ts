import knex from 'knex';

import * as config from '../../../../knexfile';

export const db = knex(config);

export default knex(config);
