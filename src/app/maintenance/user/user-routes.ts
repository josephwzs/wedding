import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";




export const userMaintenanceRoutes: Routes = [
    {
        path: 'user-detail',
        component: UserDetailComponent,
}
]