import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T {
    let value = localStorage.getItem(key) ?? '[]';
    return JSON.parse(value) as T;
  }
}
