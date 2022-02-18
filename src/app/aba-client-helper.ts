import axios from 'axios';
// import * as CryptoJS from 'crypto-js';
import * as Hashes from 'jshashes';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { ABAMerchant } from "./aba-merchant";

export class ABAClientHelper {

  constructor(public merchant: ABAMerchant) {
    this.merchant = merchant;
  }

  getAxios() {
    const _axios = axios.create();
    _axios.defaults.baseURL = `${this.merchant.baseApiUrl}/api/payment-gateway/v1/payments`;
    _axios.defaults.timeout = 60 * 1000; //60 seconds

    _axios.interceptors.request.use(config => {

      // TODO: enabled in production mode
      // config.headers.post['Referer'] = this.merchant.refererDomain;
      return config;
    });
    return _axios;
  }

  /// [getHash]
  ///
  /// `tranID`: unique tran_id < 20 characters (number, character and (-) only)
  ///
  /// `amount`: total amount
  ///
  /// `item`: base64_encode (json_encode(array item))
  ///
  /// `shipping`: shipping value
  ///
  /// ### Example:
  /// ```
  /// var merchant = ABAMerchant();
  /// var helper = ABAClientHelper(merchant);
  /// var tranID = DateTime.now().microsecondsSinceEpoch.toString();
  /// var amount = 0.00;
  /// var hash = helper.getHash(tranID: tranID, amount: amount);
  /// print(hash);
  /// ```
  getHash(
    reqTime: String,
    tranID: string,
    amount: number = 0,
    items: string = "",
    shipping: string = "",
    ctid: String = "",
    pwt: String = "",
    firstName: String = "",
    lastName: String = "",
    email: String = "",
    phone: String = "",
    type: String = "",
    paymentOption: String = "",
    returnUrl: String = "",
    cancelUrl: String = "",
    continueSuccessUrl: String = "",
    returnDeeplink: String = "",
    currency: String = "",
    customFields: String = "",
    returnParams: String = "",
  ): string {
    // String =
    // req_time + merchant_id +
    // tran_id + amount + items +
    // shipping + ctid + pwt +
    // firstname + lastname +
    // email + phone + type +
    // payment_option + return_url +
    // cancel_url + continue_success_url +
    // return_deeplink + currency + custom_fields + return_params with public_key.
    // assert(tranID != null);
    // assert(amount != null);

    var key = this.merchant.merchantApiKey;

    // var hash = crypto.createHmac("sha512", key);
    var body =
        `${reqTime}${this.merchant!.merchantID}${tranID}${amount}${items}${shipping}${ctid}${pwt}${firstName}${lastName}${email}${phone}${type}${paymentOption}${returnUrl}${cancelUrl}${continueSuccessUrl}${returnDeeplink}${currency}${customFields}${returnParams}`;
    // var digest = hash.update(body, 'utf8').digest('base64');
    var SHA512 = new Hashes.SHA512;
    var digest = SHA512.b64_hmac(key, body);
    return digest;
  }

  /// [handleTransactionResponse]
  ///
  /// `This will be describe response from each transaction based on status code`
  static handleTransactionResponse(status: number): string {
    switch (status) {
      case 1:
        return "Invalid Hash, Hash generated is incorrect and not following the guideline to generate the Hash.";
      case 2:
        return "Invalid Transaction ID, unsupported characters included in Transaction ID";
      case 3:
        return "Invalid Amount format need not include decimal point for KHR transaction. example for USD 100.00 for KHR 100";
      case 4:
        return "Duplicate Transaction ID, the transaction ID already exists in PayWay, generate new transaction.";
      case 5:
        return "Invalid Continue Success URL, (Main domain must be registered in PayWay backend to use success URL)";
      case 6:
        return "Invalid Domain Name (Request originated from non-whitelisted domain need to register domain in PayWay backend)";
      case 7:
        return "Invalid Return Param (String must be lesser than 500 chars)";
      case 9:
        return "Invalid Limit Amount (The amount must be smaller than value that allowed in PayWay backend)";
      case 10:
        return "Invalid Shipping Amount";
      case 11:
        return "PayWay Server Side Error";
      case 12:
        return "Invalid Currency Type (Merchant is allowed only one currency - USD or KHR)";
      case 13:
        return "Invalid Item, value for items parameters not following the guideline to generate the base 64 encoded array of item list.";
      case 15:
        return "Invalid Channel Values for parameter topup_channel";
      case 16:
        return "Invalid First Name - unsupported special characters included in value";
      case 17:
        return "Invalid Last Name";
      case 18:
        return "Invalid Phone Number";
      case 19:
        return "Invalid Email Address";
      case 20:
        return "Required purchase details when checkout";
      case 21:
        return "Expired production key";
      default:
        return "other - server-side error";
    }
  }

  static handleResponseError(error: any): string {
    var errorDescription: string = "";

    if (error instanceof HttpErrorResponse) {
      errorDescription = error.statusText;
    } else if (error instanceof ErrorEvent) {
      errorDescription = "An error occurred: " + error.error.message;
    } else {
      errorDescription = "Unexpected error occured";
    }
    return errorDescription;
  }
}
