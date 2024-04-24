import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storeItem<Type>(key: string, value: Type): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<Type>(key: string): Type {
    let value = localStorage.getItem(key);
    return JSON.parse(value!);
  }
}
