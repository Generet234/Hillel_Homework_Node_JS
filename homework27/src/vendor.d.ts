import {User} from './domain.ts'
declare namespace VendorSDK {
    interface Context {
        requestId: string;
        user?: User;
    }
}

function readVendorSDK(context:VendorSDK.Context) {
    console.log(context.requestId, context.user);
}