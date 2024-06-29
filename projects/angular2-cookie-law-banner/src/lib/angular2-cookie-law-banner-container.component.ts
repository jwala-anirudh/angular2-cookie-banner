/**
 * angular2-cookie-law-banner
 *
 * Copyright 2016-2018, @jwala-anirudh, All rights reserved.
 *
 * @author: @jwala-anirudh <anirudhjwala@gmail.com>
 */

import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

import { Angular2CookieLawBannerService } from "./angular2-cookie-law-banner.service";
import { CookieBannerComponent } from "./angular2-cookie-law-banner.component";
import { CookieBannerTarget, CookieBannerPosition } from "./definitions";

@Component({
  selector: "cookie-banner",
  template: `
    <cookie-banner-component
      *ngIf="!seen"
      [awsomeCloseIcon]="awsomeCloseIcon"
      [learnMore]="learnMore"
      [target]="target"
      [position]="position"
      (isSeen)="hasBeenDismissed()"
    >
      <ng-content></ng-content>
    </cookie-banner-component>
  `,
})
export class CookieBannerContainerComponent implements OnInit {
  @HostBinding("attr.seen")
  public seen: boolean;

  @ViewChild(CookieBannerComponent)
  public cookieLawComponent: CookieBannerComponent;

  @Input()
  public name: string;

  @Input()
  public learnMore: string;

  @Input()
  public target: CookieBannerTarget;

  @Input()
  public position: CookieBannerPosition;

  @Input()
  public expiration: number;

  @Input()
  public awsomeCloseIcon: string;

  @Output()
  public isSeen = new EventEmitter<boolean>();

  public get cookieLawSeen(): boolean {
    return this.cookieLawService.seen(this.name);
  }

  constructor(private cookieLawService: Angular2CookieLawBannerService) {
    this.name = "cookieLawSeen"; // set a default cookie name if not provided
    this.seen = true;
  }

  public ngOnInit() {
    this.seen = this.cookieLawService.seen(this.name);
  }

  public hasBeenDismissed(): void {
    this.cookieLawService.storeCookie(this.name, this.expiration);
    this.seen = true;
    this.isSeen.emit(true);
  }

  public dismiss(): void {
    this.cookieLawComponent.dismiss();
  }
}
