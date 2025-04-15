import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    public constructor() {}

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clearAll(): void {
        localStorage.clear();
    }

    public hasItem(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public getAll(): string[] {
        const items: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                items.push(key);
            }
        }
        return items;
    }

    public getAllItems(): { [key: string]: string } {
        const items: { [key: string]: string } = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                items[key] = localStorage.getItem(key) || '';
            }
        }
        return items;
    }
}
