export interface ABAServerResponseInterface {
    status: number;
    description?: string;
    qrString?: string;
    qrImage?: string;
    abapayDeeplink?: string;
    appStore?: string;
    playStore?: string;
    rawcontent?: string;
}

export class ABAServerResponse implements ABAServerResponseInterface {
    public status: number;
    public description?: string;
    public qrString?: string;
    public qrImage?: string;
    public abapayDeeplink?: string;
    public appStore?: string;
    public playStore?: string;
    public rawcontent?: string;

    constructor(argument: ABAServerResponseInterface) {
        this.status = argument.status;
        this.description = argument.description;
        this.qrString = argument.qrString;
        this.qrImage = argument.qrImage;
        this.abapayDeeplink = argument.abapayDeeplink;
        this.appStore = argument.appStore;
        this.playStore = argument.playStore;
        this.rawcontent = argument.rawcontent;
    }

    toMap(): Object {
        return {
            "status": this.status,
            "description": this.description,
            "qrString": this.qrString,
            "qrImage": this.qrImage,
            "abapayDeeplink": this.abapayDeeplink,
            "appStore": this.appStore,
            "playStore": this.playStore,
            "rawcontent": this.rawcontent,
        }
    }

}
