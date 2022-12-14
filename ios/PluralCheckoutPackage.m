#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>


@interface RCT_EXTERN_MODULE(PluralCheckoutPackage, NSObject)

RCT_EXTERN_METHOD(start:(NSDictionary)options environment:(NSString*)environment onReponse :(RCTResponseSenderBlock)onReponse)

@end
