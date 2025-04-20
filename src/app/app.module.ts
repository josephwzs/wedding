import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppConfigService } from './common/base/service/app-config.service';
import { HeaderBarComponent } from './common/header-bar/header-bar/header-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './common/home/home.component';
import { ImageSlideComponent } from './common/shared/image-slide/image-slide.component';
import { ImageModelComponent } from './common/shared/image-model/image-model.component';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { CardComponent } from './common/sign-up/card/card.component';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormFieldInputComponent } from './common/shared/form-field-input/form-field-input.component';
import { GroupPanelComponent } from './common/shared/group-panel/group-panel.component';
import { FormLayoutComponent } from './common/shared/form-layout/form-layout.component';
import { BaseFormComponent } from './common/shared/base-form/base-form.component';
import { SharedModule } from './common/common.modules';
import { VideoSliderComponent } from './common/shared/video-slider/video-slider.component';
import { PreventDevtoolsDirective } from './common/shared/directive/prevent-devtools.directive';
import { SideBarsComponent } from "./main/about/side-bars/side-bars.component";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import {NgbDatePaserFormatter} from '@ng-bootstrap/ng-bootstrap';
// import {NgbDateCustomParserFormatter}

export function init_app(appConfigService: AppConfigService){
  return () => {
    return appConfigService.loadConfigurations()
  }
}
@NgModule({ declarations: [AppComponent],
    exports: [
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
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxCleaveDirectiveModule,
    FontAwesomeModule,
    SharedModule
    // NgbModule,
    // PerfectScrollbarModule,
    ,
    PreventDevtoolsDirective, SideBarsComponent], providers: [
        AppConfigService,
        { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppConfigService, Location], multi: true },
        // { provide: NgbDatePaserFormatter, useClass: NgbDateCustomParserFormatter},
        HttpClientModule,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
