import { TestBed, inject } from "@angular/core/testing";

import { Angular2CookieBannerService } from "./angular2-cookie-banner.service";

describe("Angular2CookieBannerService", () => {
  let service: Angular2CookieBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Angular2CookieBannerService],
    });

    document.cookie = "cookieLawSeen=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    service = TestBed.inject(Angular2CookieBannerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#seen should return a value", () => {
    expect(service.seen()).toBe(false);
  });

  it("#seen should now have a cookie stored", () => {
    service.storeCookie("cookieLawSeen");

    expect(service.seen()).toBe(true);
    expect(service.seen("cookieLawSeen")).toBe(true);
  });

  it("set an expiration time", () => {
    service.storeCookie("cookieLawSeen", 1);

    expect(service.seen()).toBe(true);
    expect(service.seen("cookieLawSeen")).toBe(true);
    expect(
      document.cookie.match("cookieLawSeen").indexOf("cookieLawSeen")
    ).not.toBe(-1);
  });

  it(
    "seen should return the current stored cookies matching the name passed " +
      "in the argument",
    () => {
      document.cookie = " myCookie=true; ";
      document.cookie = "   yourCookie=true ; ";

      expect(service.seen("myCookie")).toEqual(true);
      expect(service.seen("yourCookie")).toEqual(true);

      document.cookie = "myCookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "yourCookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      expect(service.seen("myCookie")).toEqual(false);
      expect(service.seen("yourCookie")).toEqual(false);
    }
  );

  it("should stored different cookie names", () => {
    service.storeCookie("testCookie");

    expect(service.seen("fakeCookie")).toBe(false);
    expect(service.seen()).toBe(false);

    expect(service.seen("testCookie")).toBe(true);
  });
});
