import { Model } from 'objection';

class Order extends Model {
    static get tableName() {
        return 'orders';
    }

    static get idColumn() {
        return 'order_id';
    }
}

export default Order;