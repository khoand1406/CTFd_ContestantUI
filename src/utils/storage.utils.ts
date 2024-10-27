import * as Crypto from "crypto-js";

export class StorageUtils {
  static key = import.meta.env.APP_ENCRYPTION_KEY as string;

  static encrypt(value: string) {
    if (this.key === null)
      throw new Error("Missing encryption key for storage actions");
    return Crypto.AES.encrypt(value, this.key).toString();
  }

  static decrypt(txtToDecrypt: string) {
    return Crypto.AES.decrypt(txtToDecrypt, this.key).toString(Crypto.enc.Utf8);
  }

  static setItem(key: string, value: string, storageType: "local" | "session") {
    if (storageType === "local") localStorage.setItem(key, this.encrypt(value));
    if (storageType === "session")
      sessionStorage.setItem(key, this.encrypt(value));
  }

  static getItem(key: string, storageType: "local" | "session") {
    let data = "";
    if (storageType === "local") data = localStorage.getItem(key) || "";
    if (storageType === "session") data = sessionStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  static removeItem(key: string, storageType: "local" | "session") {
    if (storageType === "local") localStorage.removeItem(key);
    if (storageType === "session") sessionStorage.removeItem(key);
  }

  static clearItems(storageType: "local" | "session") {
    if (storageType === "local") localStorage.clear();
    if (storageType === "session") sessionStorage.clear();
  }
}
