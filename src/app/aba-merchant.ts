export interface ABAMerchantInterface {
    merchantID: string;
    merchantApiKey: string;
    merchantApiName: string;
    baseApiUrl: string;
    refererDomain: string;
}

/// ## [ABAMerchant]
/// `Represent and Hold Merchant Credential provided by aba bank supporter`
/// ### [Example]
/// ```
/// var merchant = ABAMerchant({
///   merchantID: "your_merchant_api",
///   merchantApiKey: "your_api_key",
///   merchantApiName: "your_merchant_name",
///   baseApiUrl: "based_api_url", // without merchantApiName
///   refererDomain: "", // whitelist domain
/// });
/// ```

export class ABAMerchant implements ABAMerchantInterface {

    /// provided by api
    public merchantID: string;
    public merchantApiKey: string;
    public merchantApiName: string;
    public baseApiUrl: string;
    public refererDomain: string;

    constructor(argument: ABAMerchantInterface) {
        // console.error(argument.merchantID != null);
        // console.error(argument.merchantApiKey != null);
        // console.error(argument.merchantApiName != null);
        // console.error(argument.baseApiUrl != null);
        // console.error(argument.refererDomain != null);
        this.merchantID = argument.merchantID;
        this.merchantApiKey = argument.merchantApiKey;
        this.merchantApiName = argument.merchantApiName;
        this.baseApiUrl = argument.baseApiUrl;
        this.refererDomain = argument.refererDomain;
    }

    /// ### [toMap]
    /// return map of <string, string>
    toMap(): Object {
        return {
            "merchantID": this.merchantID,
            "merchantApiKey": this.merchantApiKey,
            "merchantApiName": this.merchantApiName,
            "baseApiUrl": this.baseApiUrl,
            "refererDomain": this.refererDomain
        };
    }
}