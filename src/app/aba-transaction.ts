import { DatePipe } from '@angular/common'
import { ABAClientHelper } from "./aba-client-helper";
import { ABAMerchant } from "./aba-merchant";
import { ABAServerResponse, ABAServerResponseInterface } from "./aba-server-response";

export interface ABATransactionInterface {

  merchant: ABAMerchant;
  tranID: string;
  amount: number;
  items?: any[];
  hash: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  returnUrl: string;
  continueSuccessUrl: string;
  returnParams: string;
  phoneCountryCode: string;
  preAuth: string;
  paymentOption: AcceptPaymentOption;
  shipping?: number;

}


export class ABATransaction implements ABATransactionInterface {
  merchant: ABAMerchant;
  tranID: string;
  amount: number;
  items: any[];
  hash: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  returnUrl: string;
  continueSuccessUrl: string;
  returnParams: string;
  phoneCountryCode: string;
  preAuth: string;
  paymentOption: AcceptPaymentOption;
  shipping?: number;

  constructor(argument: ABATransactionInterface) {
    this.merchant = argument.merchant;
    this.tranID = argument.tranID;
    this.amount = argument.amount;
    this.items = argument.items;
    this.hash = argument.hash;
    this.firstname = argument.firstname;
    this.lastname = argument.lastname;
    this.phone = argument.phone;
    this.email = argument.email;
    this.returnUrl = argument.returnUrl;
    this.continueSuccessUrl = argument.continueSuccessUrl;
    this.returnParams = argument.returnParams;
    this.phoneCountryCode = argument.phoneCountryCode;
    this.preAuth = argument.preAuth;
    this.paymentOption = argument.paymentOption;
    this.shipping = argument.shipping;
  };

  static instance(merchant: ABAMerchant): ABATransaction {
    var map: ABATransactionInterface = {
      merchant: merchant,
      tranID: `${new Date().valueOf()}`,
      amount: 0,
      hash: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      returnUrl: "",
      continueSuccessUrl: "",
      returnParams: "",
      phoneCountryCode: "",
      preAuth: "",
      paymentOption: AcceptPaymentOption.cards,
    };
    return new ABATransaction(map);
  }

  public get reqTime(): String {
    var date = new Date();
    /// yMddHms
    let formatDate = `${date.getFullYear}${date.getMonth}${date.getDate}${date.getHours}${date.getMinutes}${date.getSeconds}`;
    return formatDate;
  }
  /// ### [toMap]
  /// [return] map object
  toMap() {
    // base64_encode (json_encode(array item))
    var _encodedItem: string = btoa(JSON.stringify(this.items));
    var _ctid = "";
    var _pwt = "";
    var _currency = "USD";
    var _type = "purchase";
    var _paymentOption = this.paymentOption.valueOf();

    var _hash = new ABAClientHelper(this.merchant).getHash(this.reqTime, this.tranID, this.amount, _encodedItem, `${this.shipping}`, _ctid, _pwt, this.firstname, this.lastname, this.email, this.phone, _type, _paymentOption, _currency);
    var map = {
      "req_time": this.reqTime,
      "tran_id": this.tranID,
      "amount": this.amount,
      "items": _encodedItem,
      "hash": _hash,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "phone": this.phone,
      "email": this.email,
      "return_url": this.returnUrl,
      "continue_success_url": this.continueSuccessUrl ?? "",
      "return_params": this.returnParams ?? "",
      // "return_params": {"tran_id": tranID, "status": 0},
      // "phone_country_code": phoneCountryCode ?? "855",
      // "PreAuth": preAuth,
      "payment_option": _paymentOption,
      "shipping": this.shipping,
      "currency": _currency,
      "merchant_id": this.merchant!.merchantID,
      "type": _type,
    };
    return map;
  }


  /// Method:

  /// ## `create transaction`
  ///
  async create(): Promise<ABAServerResponse> {
    var res = new ABAServerResponse({ status: 11 });
    var fromData = this.toMap();
    try {
      var helper = new ABAClientHelper(this.merchant);
      var response = await helper.getAxios().post("/purchase", fromData);
      try {
        console.log(response.data);

        // var _data: ABAServerResponseInterface = response;
        // res = new ABAServerResponse(_data);
        return res;
      } catch (e) {
        res.status = 0;
        res.description = "success";
        res.rawcontent = JSON.stringify(response.data);
        return res;
      }
    } catch (error) {
      console.log(`Exception occured: ${error}`);
      res.description = ABAClientHelper.handleResponseError(error);
    }
    return res;
  }

  /// ## check transaction
  ///
  async check(): Promise<ABAServerResponse> {

    var res = new ABAServerResponse({ status: 11 });
    var fromData = {
      "tran_id": this.tranID,
      "hash": new ABAClientHelper(this.merchant).getHash(this.tranID, this.tranID)
    };


    try {
      var helper = new ABAClientHelper(this.merchant);
      var response = await helper.getAxios().post("/check-transaction", fromData);

      try {
        console.log(response.data);

        // var _data: ABAServerResponseInterface = response;
        // res = new ABAServerResponse(_data);
      } catch (e) {
        res.status = 0;
        res.description = "success";
        res.rawcontent = JSON.stringify(response.data);
        return res;
      }
    } catch (error) {
      res.description = ABAClientHelper.handleResponseError(error);
    }
    return res;
  }
}


export enum AcceptPaymentOption { cards = "cards", abapay = "abapay", abapay_deeplink = "abapay_deeplink" }
