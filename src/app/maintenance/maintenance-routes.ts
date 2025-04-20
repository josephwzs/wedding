import { Routes } from "@angular/router";
import { dashboardMaintenanceRoutes } from "./dashboard/dashboard-maintenance-routes";
import { inProgressMaintenanceRoutes } from "./in-progress/in-progress-routes";
import { userMaintenanceRoutes } from "./user/user-routes";

let maintenanceRoutes: Routes = [];

export const routes: Routes = maintenanceRoutes.concat(
    dashboardMaintenanceRoutes,
    inProgressMaintenanceRoutes,
    userMaintenanceRoutes
)