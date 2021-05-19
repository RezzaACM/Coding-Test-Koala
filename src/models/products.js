import { Model } from 'objection';

class Products extends Model {
  static get tableName() {
    return 'products';
  }

  static get idColumn() {
    return 'product_id';
  }
}

export default Products;