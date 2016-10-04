import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular2-material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { TdMediaService } from '../shared/services/media.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit, OnDestroy {
  @ViewChild('start') sidenav: MdSidenav;
  @ViewChild('navbar') navbar: NavbarComponent;
  private mediaquerySubscription: Subscription;

  constructor(private media: TdMediaService) { }

  private checkMedia(isLarge: boolean) {
    if (isLarge) {
      this.sidenav.close();
      this.sidenav.mode = 'side';
      this.navbar.showSidebarButton = false;
      this.sidenav.open();

    } else {
      this.sidenav.close();
      this.navbar.showSidebarButton = true;
      this.sidenav.mode = 'over';
    }
  }

  ngOnInit() {
    this.checkMedia(this.media.query('gt-xs'));
    this.mediaquerySubscription = this.media.registerQuery('gt-xs').subscribe(value=>{this.checkMedia(value)});
  }

  ngOnDestroy() {
    this.mediaquerySubscription.unsubscribe();
  }

  openSidebar() {
    this.sidenav.open();
  }

  closeSidebar() {
    if (this.sidenav.mode != 'side') {
      this.sidenav.close();
    }
  }

}
