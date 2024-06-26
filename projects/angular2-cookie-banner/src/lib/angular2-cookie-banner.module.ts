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

import { CookieLawComponent } from "./angular2-cookie-banner.component";
import { CookieLawContainerComponent } from "./angular2-cookie-banner-container.component";

@NgModule({
  imports: [CommonModule],
  declarations: [CookieLawComponent, CookieLawContainerComponent],
  exports: [CookieLawContainerComponent],
})
export class CookieLawModule {
  constructor(@Optional() @SkipSelf() parentModule: CookieLawModule) {
    if (parentModule) {
      throw new Error(
        "CookieLawModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
