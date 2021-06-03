import BaseController from './BaseController';

class StockDataServiceController {
  getStockData(success, failure) {
    let url =
      'https://stocktradingassist-programdatafiles.s3.ap-south-1.amazonaws.com/displayDataJsonFile.json';
    BaseController.sendRequest(url, 'get', null, success, failure);
  }
}

let stockDataServiceController = new StockDataServiceController();

export default stockDataServiceController;
