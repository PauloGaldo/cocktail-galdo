export class MobileUtils {

  public static isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

}