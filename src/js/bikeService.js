export default class BikeService {

  static async getLocalBikes(location) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${location}&stolenness=proximity`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getStolenBikes(location) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search/count?location=${location}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}

