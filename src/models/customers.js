import { Model } from 'objection';

class Customers extends Model {
  static get tableName() {
    return 'customers';
  }

  static get idColumn() {
    return 'customer_id';
  }
}

export default Customers;