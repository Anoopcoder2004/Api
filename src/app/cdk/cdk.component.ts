import {
  Component,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  TemplateRef, // ✅ NEW: proper typing for template
} from '@angular/core';

import {
  Overlay,
  OverlayRef,
  OverlayModule,
} from '@angular/cdk/overlay';

import {
  TemplatePortal,
  PortalModule,
} from '@angular/cdk/portal';

import {
  ScrollDispatcher,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; // ✅ NEW: for cleanup

@Component({
  selector: 'app-cdk',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
  templateUrl: './cdk.component.html',
  styleUrl: './cdk.component.scss',
})
export class CdkComponent {
  @ViewChild('searchBtn') searchBtn!: ElementRef;
  @ViewChild('searchTpl') searchTpl!: TemplateRef<any>; // ✅ FIXED type

  overlayRef!: OverlayRef;
  scrollSub!: Subscription; // ✅ NEW: track scroll subscription

  rows = Array.from({ length: 40 }, (_, i) => i + 1);

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  openSearch() {
    // ✅ Close existing overlay if open
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.cleanupScroll();
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.searchBtn)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ])
      .withPush(true)
      .withScrollableContainers(
        this.scrollDispatcher.getAncestorScrollContainers(
          this.searchBtn
        )
      );

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.attach(
      new TemplatePortal(this.searchTpl, this.vcr)
    );

    // 🔴 NEW: Close overlay when scrolling (prevents floating)
    this.scrollSub = this.scrollDispatcher.scrolled().subscribe(() => {
      this.overlayRef?.detach();
      this.cleanupScroll();
    });

    // ✅ Backdrop click cleanup
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
      this.cleanupScroll();
    });
  }

  // ✅ NEW: centralized cleanup (important)
  private cleanupScroll() {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }
}
