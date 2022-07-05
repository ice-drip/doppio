export abstract class Doppio {
  private static testUserAgent() {
    let agent = navigator.userAgent;
    return /headless/i.test(agent);
  }
  private static testAppVersion() {
    let appVersion = navigator.appVersion;
    return /headless/i.test(appVersion);
  }
  private static testPlugins() {
    let length = navigator.plugins.length;
    return length === 0;
  }

  private static testMime() {
    let length = navigator.mimeTypes.length;
    return length === 0;
  }

  private static testLanguages() {
    let language = navigator.language;
    let languagesLength = navigator.languages.length;

    if (!language || languagesLength === 0) return true;
    return false;
  }
  private static testWebdriver() {
    let webdriver = navigator.webdriver;
    return webdriver;
  }

  private static testOuter() {
    let outerHeight = window.outerHeight;
    let outerWidth = window.outerWidth;
    return outerHeight === 0 && outerWidth === 0;
  }

  private static testConnectionRtt() {
    let connection: any = navigator.connection;
    let connectionRtt = connection ? connection.rtt : undefined;
    return connectionRtt === undefined ? false : connectionRtt === 0;
  }

  private static list_run(): string[] {
    const trueType: string[] = [];
    if (this.testUserAgent()) {
      trueType.push("user_agent");
    }
    if (this.testAppVersion()) {
      trueType.push("app_version");
    }
    if (this.testPlugins()) {
      trueType.push("test_plugin");
    }
    if (this.testMime()) {
      trueType.push("mime_type");
    }
    if (this.testLanguages()) {
      trueType.push("language");
    }
    if (this.testWebdriver()) {
      trueType.push("web_driver");
    }
    if (this.testOuter()) {
      trueType.push("outer");
    }
    if (this.testConnectionRtt()) {
      trueType.push("connection_rtt");
    }
    return trueType;
  }

  public static check() {
    if (!/(AppleWebKit)/i.test(navigator.userAgent)) {
      return new Promise<HeadlessType>((resolve, _reject) => {
        navigator.permissions
          .query({ name: "notifications" })
          .then((permissionStatus) => {
            const trueType = [];
            if (
              Notification.permission === "denied" &&
              permissionStatus.state === "prompt"
            ) {
              trueType.push("permission");
            }
            const list_run = this.list_run();
            if (list_run.length) {
              trueType.push(...list_run);
            }
            if (trueType.length > 0) {
              resolve({ headless: true, type: trueType });
            } else {
              resolve({ headless: false, type: [] });
            }
          });
      });
    } else {
      return new Promise<HeadlessType>((resolve) => {
        const trueType = [];
        const list_run = this.list_run();
        if (list_run.length) {
          trueType.push(...list_run);
        }
        if (trueType.length > 0) {
          resolve({ headless: true, type: trueType });
        } else {
          resolve({ headless: false, type: [] });
        }
      });
    }
  }

  public static shut_up(
    message: string = "Please use a regular browser to access"
  ) {
    this.check().then((res) => {
      if (res.headless) {
        document.body.remove();
        alert(message);
      } else {
        console.info("Doppio: your are a human");
      }
    });
  }
}

interface HeadlessType {
  headless: boolean;
  type: string[];
}
