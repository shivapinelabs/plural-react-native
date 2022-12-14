extension NSDictionary {
  
  var swiftDictionary: [String : Any] {
    var swiftDictionary: [String : Any] = [:]
    let keys = self.allKeys.flatMap { $0 as? String }
    for key in keys {
      let keyValue = self.value(forKey: key) as AnyObject
      swiftDictionary[key] = keyValue
    }
    return swiftDictionary
  }
}

import Foundation
import UIKit

import PluralCheckout

@objc(PluralCheckoutPackage)
class PluralCheckoutPackage: NSObject {

  
  static var onResponseCallback:RCTResponseSenderBlock?=nil;

  @objc
  func start(_ options:NSDictionary,environment:NSString,onReponse:@escaping RCTResponseSenderBlock){
    
    PluralCheckoutPackage.onResponseCallback = onReponse
    
    
   let optionsData =  options.swiftDictionary
    var envTOPass: PluralEnvironment
    
    switch environment{
    case "UAT":
      envTOPass = PluralEnvironment.isUAT
    case "PROD":
      envTOPass = PluralEnvironment.isProd
    case "QA":
      envTOPass = PluralEnvironment.isQA
    default:
      envTOPass = PluralEnvironment.isDev
    }
    
    DispatchQueue.main.async {
      let rootViewController = UIApplication.shared.delegate?.window??.rootViewController;
      PluralPGPaymentManager.open(options: optionsData, environment: envTOPass, context: rootViewController!, pluralPGResponseCallback: MerchantCallbackResponse())
    }
    
  }
  @objc static func requiresMainQueueSetup() -> Bool {return true;}
  
}



public class MerchantCallbackResponse:UIViewController, IPluralPGResponseCallback
{
  public func onErrorOccured(code: Int, message: String) {
    let resultsDict = [
     "statusCode" : 400,
     "message": message
    ] as [String : Any]
    
    PluralCheckoutPackage.onResponseCallback!([resultsDict])  }
  
  
  public func onTransactionResponse(paymentId: String, pluralOrderId: String) {
    let dict = ["paymentId":paymentId,"pluralOrderId":pluralOrderId]
    
    let resultsDict = [
     "statusCode" : 200,
     "message": dict
    ] as [String : Any]
    
    PluralCheckoutPackage.onResponseCallback!([resultsDict])
    
  }
  
  public func onCancelTxn() {
   
    let resultsDict = [
     "statusCode" : 300,
     "message": "transcation cancelled by user"
    ] as [String : Any]
    PluralCheckoutPackage.onResponseCallback!([resultsDict])
  }
  
  

}