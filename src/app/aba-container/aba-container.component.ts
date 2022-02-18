import { Component, OnInit } from '@angular/core';
import { ABAClientHelper } from '../aba-client-helper';
import { ABAMerchant, ABAMerchantInterface } from '../aba-merchant';
import { ABAString } from '../aba-string';
import { ABATransaction, ABATransactionInterface, AcceptPaymentOption } from '../aba-transaction';

@Component({
  selector: 'app-aba-container',
  templateUrl: './aba-container.component.html',
  styleUrls: ['./aba-container.component.scss'],
})
export class ABAContainerComponent implements OnInit {

  strings: ABAString = new ABAString();
  merchant: ABAMerchant;
  transaction: ABATransaction;

  constructor() {
    //
    const _merchantType: ABAMerchantInterface = {
      merchantID: "Your_merchantID",
      merchantApiName: "Your_merchantApiName",
      merchantApiKey: "Your_merchantApiKey",
      baseApiUrl: "https://checkout-uat.payway.com.kh",
      refererDomain: "https://mylekha.app",
    };
    this.merchant = new ABAMerchant(_merchantType);

    // test helper
    // var _helper = new ABAClientHelper(this.merchant);
    // var _tranID = new Date().valueOf();
    // var _hash = _helper.getHash(`${_tranID}`, 0.00);
    // console.log("_tranID", _tranID)
    // console.log("_hash", _hash);
    //

    const _transactionType: ABATransactionInterface = {
      merchant: this.merchant,
      tranID: '',
      amount: 0,
      hash: '',
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      returnUrl: '',
      continueSuccessUrl: '',
      returnParams: '',
      phoneCountryCode: '',
      preAuth: '',
      paymentOption: AcceptPaymentOption.cards
    };
    this.transaction = ABATransaction.instance(this.merchant);
    this.transaction.items = [{ "id": 1, "name": "item", "price": 10 }];
    var json = this.transaction.toMap();;
    console.log("hash", json.hash);
    console.log("tranID", json.tran_id);
  }

  async onClicked() {
    await this.transaction.create();
  }

  ngOnInit() { }

}
