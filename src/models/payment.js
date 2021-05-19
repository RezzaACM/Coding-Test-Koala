import { Model } from 'objection';

class Payment extends Model {
  static get tableName() {
    return 'payment_methods';
  }

  static get idColumn() {
    return 'payment_method_id';
  }
}

export default Payment;