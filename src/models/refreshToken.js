import { Model } from 'objection';

class RefreshToken extends Model {
  static get tableName() {
    return 'oauth_refresh_token';
  }

}

export default RefreshToken;