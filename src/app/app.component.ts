import { Component, inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'galdo-root',
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
})
export class App implements OnInit {
  protected readonly matIconRegistry = inject(MatIconRegistry);
  protected readonly domSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('es', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/es.svg'));
    this.matIconRegistry.addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/en.svg'));
  }
}
