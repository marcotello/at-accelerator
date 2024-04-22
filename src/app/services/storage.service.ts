import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storeItem<Type>(key: string, value: Type): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<Type>(key: string): Type | null {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  }
}
