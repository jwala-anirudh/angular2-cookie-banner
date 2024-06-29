import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookieBannerContainerComponent } from "./angular2-cookie-law-banner-container.component";
import { Angular2CookieLawBannerService } from "./angular2-cookie-law-banner.service";
import { CookieBannerComponent } from "./angular2-cookie-law-banner.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("CookieBannerContainerComponent", () => {
  let component: CookieBannerContainerComponent;
  let cookiesPolicyService: Angular2CookieLawBannerService;
  let fixture: ComponentFixture<CookieBannerContainerComponent>;

  // stub CookieBannerService for test purposes
  const CookieBannerServiceStub = {
    _seen: false,

    seen() {
      return this._seen;
    },

    storeCookie() {
      this._seen = true;
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CookieBannerContainerComponent, CookieBannerComponent],
      providers: [
        {
          provide: Angular2CookieLawBannerService,
          useValue: CookieBannerServiceStub,
        },
      ],
    }).compileComponents();

    cookiesPolicyService = TestBed.inject(Angular2CookieLawBannerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieBannerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the cookie policy notification", () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);

    expect(component).not.toBeNull();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      "By continuing to browse the site, you're agreeing to our use of cookies."
    );
  });

  it("CookieBannerComponent should have a `seen` attribute", () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(element.getAttribute("seen")).toBe("false");
  });

  it("CookieBannerComponent should be initially visible", () => {
    fixture.detectChanges();

    expect(component.seen).toBe(false);
    expect(component.cookieLawSeen).toBe(false);
  });

  it("CookieBannerComponent should be dismissible", () => {
    fixture.detectChanges();

    expect(component.seen).toBe(false);

    component.hasBeenDismissed();
    fixture.detectChanges();

    expect(component.seen).toBe(true);
    expect(component.cookieLawSeen).toBe(true);
  });

  it("CookieBannerElementComponent should accept attributes", () => {
    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(
      By.css("cookie-banner-component")
    );

    expect(fixture.nativeElement.getAttribute("seen")).toBe("false");

    expect(el.nativeElement.textContent).not.toContain(
      `Learn more in our privacy policy.`
    );
    expect(el.componentInstance.name).not.toBeDefined();
    expect(el.componentInstance.learnMore).not.toBeDefined();
    expect(el.componentInstance.target).toBe("_blank");
    expect(el.componentInstance.position).toBe("bottom");
    expect(el.componentInstance.transition).toBe("bottomIn");
  });

  it("CookieBannerElementComponent should renders on the top", () => {
    component.name = "myCookie";
    component.position = "top";

    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(
      By.css("cookie-banner-component")
    );

    expect(component.position).toBe("top");
    expect(el.componentInstance.position).toBe("top");
  });

  it("CookieBannerElementComponent learnMore", () => {
    component.learnMore = "/#cookies";
    component.target = "_self";

    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(
      By.css("cookie-banner-component")
    );

    expect(el.componentInstance.target).toBe("_self");
    expect(el.nativeElement.textContent).toContain(
      `Learn more in our privacy policy.`
    );

    component.learnMore = "false";

    fixture.detectChanges();

    expect(el.componentInstance.learnMore).toBeNull();
  });
});
