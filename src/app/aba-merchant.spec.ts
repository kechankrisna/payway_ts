import { ABAMerchant } from './aba-merchant';

describe('ABAMerchant', () => {
  it('should create an instance', () => {
    var argument = {
      merchantID: "your_merchant_api",
      merchantApiKey: "your_api_key",
      merchantApiName: "your_merchant_name",
      baseApiUrl: "based_api_url", // without merchantApiName
      refererDomain: "http://localhost", // whitelist domain
    };
    expect(new ABAMerchant(argument)).toBeTruthy();
  });
});
