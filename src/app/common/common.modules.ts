import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, Location} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BaseFormComponent } from './shared/base-form/base-form.component';
import { CardComponent } from './sign-up/card/card.component';
import { FormFieldInputComponent } from './shared/form-field-input/form-field-input.component';
import { FormLayoutComponent } from './shared/form-layout/form-layout.component';
import { GroupPanelComponent } from './shared/group-panel/group-panel.component';
import { HeaderBarComponent } from './header-bar/header-bar/header-bar.component';
import { HomeComponent } from './home/home.component';
import { ImageModelComponent } from './shared/image-model/image-model.component';
import { ImageSlideComponent } from './shared/image-slide/image-slide.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import { RouterModule } from '@angular/router';
import { VideoSliderComponent } from './shared/video-slider/video-slider.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import {NgbDatePaserFormatter} from '@ng-bootstrap/ng-bootstrap';
// import {NgbDateCustomParserFormatter}


@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HeaderBarComponent,
        PageNotFoundComponent,
        ImageSlideComponent,
        ImageModelComponent,
        SignUpComponent,
        CardComponent,
        FormFieldInputComponent,
        GroupPanelComponent,
        FormLayoutComponent,
        BaseFormComponent,
        VideoSliderComponent,
    ], imports: [ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgxCleaveDirectiveModule,
        FontAwesomeModule,
        RouterModule,
        CommonModule, PageNotFoundComponent,
        LoginComponent,
        HomeComponent,
        HeaderBarComponent,
        ImageSlideComponent,
        ImageModelComponent,
        SignUpComponent,
        CardComponent,
        FormFieldInputComponent,
        GroupPanelComponent,
        FormLayoutComponent,
        BaseFormComponent,
        VideoSliderComponent], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class SharedModule {}
