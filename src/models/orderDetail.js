import { Model } from 'objection';

class OrderDetails extends Model {
    static get tableName() {
        return 'order_details';
    }

    static get idColumn() {
        return 'order_detail_id';
    }
}

export default OrderDetails;