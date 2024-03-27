import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    loadingSet: Set<string> = new Set<string>();

    setLoading(loading: boolean, url: string): void {
        if (!url) {
            throw new Error('The request URL must be provided to the LoadingService.setLoading function');
        }

        if (loading) {
            this.loadingSet.add(url);
            this.loading$.next(true);
        } else if (this.loadingSet.has(url)) {
            this.loadingSet.delete(url);
        }

        if (this.loadingSet.size === 0) {
            this.loading$.next(false);
        }
    }
}
