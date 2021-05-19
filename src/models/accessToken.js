import { Model } from 'objection';

class AccessToken extends Model {
  static get tableName() {
    return 'oauth_access_token';
  }

}

export default AccessToken;