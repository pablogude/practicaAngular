export class UserHelper {
  public static isLoggedIn = () => {
    if (localStorage.getItem('--token-Users&Posts') != null) {
      return true;
    }
    return false;
  };
}
