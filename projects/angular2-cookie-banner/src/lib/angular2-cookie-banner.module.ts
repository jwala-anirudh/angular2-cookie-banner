/**
 * angular2-cookie-banner
 *
 * Copyright 2016-2018, @jwala-anirudh, All rights reserved.
 *
 * @author: @jwala-anirudh <anirudhjwala@gmail.com>
 */

import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { CookieBannerComponent } from "./angular2-cookie-banner.component";
import { CookieBannerContainerComponent } from "./angular2-cookie-banner-container.component";

@NgModule({
  imports: [CommonModule],
  declarations: [CookieBannerComponent, CookieBannerContainerComponent],
  exports: [CookieBannerContainerComponent],
})
export class CookieBannerModule {
  constructor(@Optional() @SkipSelf() parentModule: CookieBannerModule) {
    if (parentModule) {
      throw new Error(
        "CookieBannerModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
