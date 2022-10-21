//
//  RNShare.m
//  MyApp
//
//  Created by Karol Moroz on 21/10/2022.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface
RCT_EXTERN_MODULE(RNShare, NSObject)
RCT_EXTERN_METHOD(open:(NSDictionary *) options)
@end
