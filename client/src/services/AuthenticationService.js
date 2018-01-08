import Api from '@/services/Api';

export default {
  async register (credentials) {
    return Api().post('register', credentials);
  }
};
