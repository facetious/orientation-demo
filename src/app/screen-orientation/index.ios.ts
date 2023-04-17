import { Application, Frame } from '@nativescript/core';

function applicationSupportedInterfaceOrientationsForWindow(_application: UIApplication, _window: UIWindow): UIInterfaceOrientationMask {
  if ((global as any).lockOrientation) {
    if ((global as any).lockPortrait) {
      console.log(`fetching supported interface orientations... [portrait]`);
      return UIInterfaceOrientationMask.Portrait;
    } else {
      console.log(`fetching supported interface orientations... [landscape]`);
      return UIInterfaceOrientationMask.Landscape;
    }
  }
  console.log(`fetching supported interface orientations... [all]`);
  return UIInterfaceOrientationMask.AllButUpsideDown;
};

export function setOrientation(orientation: string = 'portrait', locked: boolean = true): void {
  if (!(global as any).orientationIsSetup) {
    console.log(`Setting up orientation...`);
    (global as any).orientationIsSetup = true;
    if (Application.ios.delegate === undefined) {
      var UIApplicationDelegateImpl = /** @class */ (function (_super) {
        __extends(UIApplicationDelegateImpl, _super);
        function UIApplicationDelegateImpl() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        UIApplicationDelegateImpl.ObjCProtocols = [UIApplicationDelegate];
        return UIApplicationDelegateImpl;
      }(UIResponder));
      Application.ios.delegate = UIApplicationDelegateImpl;
    }
    Application.ios.delegate.prototype
      .applicationSupportedInterfaceOrientationsForWindow = applicationSupportedInterfaceOrientationsForWindow;
  }
  const valueKey: string = 'orientation';
  switch (orientation) {
    case 'landscape':
      (global as any).lockPortrait = false;
      (global as any).lockOrientation = locked === true; // only when explicit true boolean
      UIDevice.currentDevice.setValueForKey(
        NSNumber.numberWithInt(UIInterfaceOrientation.LandscapeRight),
        valueKey,
      );
      break;
    case 'portrait':
      (global as any).lockPortrait = true;
      (global as any).lockOrientation = locked === true; // only when explicit true boolean
      UIDevice.currentDevice.setValueForKey(NSNumber.numberWithInt(UIInterfaceOrientation.Portrait), valueKey);
      break;
    default:
      (global as any).lockOrientation = false;
      UIDevice.currentDevice.setValueForKey(NSNumber.numberWithInt(UIInterfaceOrientation.Unknown), valueKey);
      break;
  }
  Application.ios.window?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations();
}
