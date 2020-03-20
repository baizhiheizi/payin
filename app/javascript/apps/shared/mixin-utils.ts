function MixinUtils() {}

MixinUtils.prototype = {
  environment: function() {
    if (
      (<any>window).webkit &&
      (<any>window).webkit.messageHandlers &&
      (<any>window).webkit.messageHandlers.MixinContext
    ) {
      return 'iOS';
    }
    if ((<any>window).MixinContext && (<any>window).MixinContext.getContext) {
      return 'Android';
    }
    return undefined;
  },

  conversationId: function() {
    let ctx: any;
    switch (this.environment()) {
      case 'iOS':
        ctx = prompt('MixinContext.getContext()');
        return JSON.parse(ctx).conversation_id;
      case 'Android':
        ctx = (<any>window).MixinContext.getContext();
        return JSON.parse(ctx).conversation_id;
      default:
        return undefined;
    }
  },

  appVersion: function() {
    let ctx: any;
    switch (this.environment()) {
      case 'iOS':
        ctx = prompt('MixinContext.getContext()');
        return JSON.parse(ctx).app_version;
      case 'Android':
        ctx = (<any>window).MixinContext.getContext();
        return JSON.parse(ctx).app_version;
      default:
        return undefined;
    }
  },

  immersive: function() {
    let ctx: any;
    switch (this.environment()) {
      case 'iOS':
        ctx = prompt('MixinContext.getContext()');
        return JSON.parse(ctx).immersive;
      case 'Android':
        ctx = (<any>window).MixinContext.getContext();
        return JSON.parse(ctx).immersive;
      default:
        return undefined;
    }
  },
};

export const mixinUtils = new MixinUtils();
