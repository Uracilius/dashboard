import { Component } from '@angular/core';
import { LoadingService } from './services/loading-service';
import { delay } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('invisible', style({ opacity: 0 })),
      transition('visible => invisible', animate('500ms ease-out')),
    ])
  ]
  
})
export class AppComponent {
  loading = false; // Controls loading state, true when loading starts
  showSpinner = false; // Controls spinner visibility, used with *ngIf

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscribeLoading();
  }

  subscribeLoading() {
    this.loadingService.loading$.subscribe({
      next: (isLoading) => {
        if (isLoading) {
          this.showSpinner = true;
          this.loading = true;
        } else {
          this.loading = false; 
        }
      }
    });
  }

  animationDone() {
    if (!this.loading) {
      this.showSpinner = false; 
    }
  }
}

