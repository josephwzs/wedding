import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/common/base/service/app-config.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true
})
export class DashboardComponent implements OnInit {
  router: Router
  constructor(
    private appConfigService: AppConfigService,
    router: Router,
  ) {
    this.router = router
   }

  ngOnInit(): void {
  }

  updateAccount(){
    const id = this.appConfigService.getLoggedInUser().id
    const isLive = true
    this.router.navigate(["/maintenance/user-detail"], {
      queryParams: {
        id,
        isLive
      },

    })
  }
}
