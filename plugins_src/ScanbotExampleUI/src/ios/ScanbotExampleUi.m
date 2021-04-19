/********* ScanbotExampleUI.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <QBImagePickerController/QBImagePickerController.h>

@interface ScanbotExampleUi : CDVPlugin<QBImagePickerControllerDelegate> {
    CDVInvokedUrlCommand* _command;
}
@property CDVInvokedUrlCommand* command;
- (void)startMultipleImagePicker:(CDVInvokedUrlCommand*)command;
@end

@implementation ScanbotExampleUi

- (void)startMultipleImagePicker:(CDVInvokedUrlCommand*)command
{
    self.command = command;
    __weak ScanbotExampleUi* weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        QBImagePickerController* viewController = [weakSelf createImagePickerViewController];
        [[weakSelf rootViewController] presentViewController:viewController animated:true completion:nil];
    });
}

- (void)qb_imagePickerController:(QBImagePickerController *)imagePickerController didFinishPickingAssets:(NSArray *)assets {
    
    __weak ScanbotExampleUi *weakSelf = self;
    
    NSLock* lock = [[NSLock alloc] init];
    NSMutableArray* imageFileUrls = [[NSMutableArray alloc] init];
    
    dispatch_group_t group = dispatch_group_create();

    for (PHAsset *asset in assets) {
        dispatch_group_enter(group);
        [weakSelf imagePathFromAsset:asset onFinish: ^(NSString* imageFileUrl) {
            [lock lock];
            [imageFileUrls addObject:imageFileUrl];
            dispatch_group_leave(group);
            [lock unlock];
        }];
    }
    
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        printf("Got %ld image files", imageFileUrls.count);
        
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{
            @"status": @"OK",
            @"imagesFileUris": imageFileUrls
        }];
        
        [imagePickerController dismissViewControllerAnimated:true completion:nil];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:weakSelf.command.callbackId];
    });
}

- (void) imagePathFromAsset:(PHAsset*)asset onFinish:(void(^_Nonnull)(NSString*))completion {
    PHContentEditingInputRequestOptions* options = [[PHContentEditingInputRequestOptions alloc] init];
    options.networkAccessAllowed = NO;
    
    [asset requestContentEditingInputWithOptions:options completionHandler:^(PHContentEditingInput * _Nullable contentEditingInput, NSDictionary * _Nonnull info) {
        if(!contentEditingInput || !contentEditingInput.fullSizeImageURL) {
            completion(NULL);
            return;
        }
        
        completion(contentEditingInput.fullSizeImageURL.absoluteString);
    }];
}

- (QBImagePickerController*) createImagePickerViewController {
    QBImagePickerController* viewController = [[QBImagePickerController alloc] init];
    viewController.delegate = self;
    viewController.allowsMultipleSelection = YES;
    viewController.mediaType = QBImagePickerMediaTypeImage;
    viewController.maximumNumberOfSelection = 0;
    viewController.showsNumberOfSelectedAssets = true;
    [viewController setModalPresentationStyle:UIModalPresentationFullScreen];
    return viewController;
}

- (UIViewController*) rootViewController {
    return [UIApplication sharedApplication].delegate.window.rootViewController;
}

@end
