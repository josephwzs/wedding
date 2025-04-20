import { ComponentFactoryResolver, NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
// import {DragDropModule} from '@angular/cdk/drag-drop';
import { routes } from "./maintenance-routes";
import { DashboardComponent } from './dashboard/dashboard.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AppModule } from "../app.module";
import { AppRoutingModule } from "../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxCleaveDirectiveModule } from "ngx-cleave-directive";
import { BaseFormComponent } from "../common/shared/base-form/base-form.component";
import { CardComponent } from "../common/sign-up/card/card.component";
import { FormFieldInputComponent } from "../common/shared/form-field-input/form-field-input.component";
import { FormLayoutComponent } from "../common/shared/form-layout/form-layout.component";
import { GroupPanelComponent } from "../common/shared/group-panel/group-panel.component";
import { HeaderBarComponent } from "../common/header-bar/header-bar/header-bar.component";
import { ImageModelComponent } from "../common/shared/image-model/image-model.component";
import { ImageSlideComponent } from "../common/shared/image-slide/image-slide.component";
import { PageNotFoundComponent } from "../common/page-not-found/page-not-found.component";
import { SignUpComponent } from "../common/sign-up/sign-up.component";
import { CommonModule } from "@angular/common";
import { AppComponent } from "../app.component";
import { HomeComponent } from "../common/home/home.component";
import { LoginComponent } from "../common/login/login.component";
import { SharedModule } from "../common/common.modules";


@NgModule({
    exports: [
        NgbModule,
    ], imports: [RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgxCleaveDirectiveModule,
        FontAwesomeModule,
        CommonModule,
        SharedModule
        //common modules
        // HeaderBarComponent,
        // PageNotFoundComponent,
        // HeaderBarComponent,
        // ImageSlideComponent,
        // ImageModelComponent,
        // SignUpComponent,
        // CardComponent,
        // FormFieldInputComponent,
        // GroupPanelComponent,
        // FormLayoutComponent,
        // BaseFormComponent,
        , DashboardComponent,
        InProgressComponent,
        AccountDetailComponent,
        UserDetailComponent,
        UserListComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })

export class MaintenanceModule {}