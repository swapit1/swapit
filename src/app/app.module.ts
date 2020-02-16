import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppBreadcrumbComponent } from './app.breadcrumb.component';
import {AppRightpanelComponent} from './app.rightpanel.component';
import {AppInlineProfileComponent} from './app.profile.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {BreadcrumbService} from './breadcrumb.service';
import { ClientsService } from './services/clients.service';
import { PropertyService } from './services/property.service';

import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewPropertyComponent } from './components/view-property/view-property.component';
import { AllPropertiesComponent } from './components/all-properties/all-properties.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginService } from './services/login.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppPasswordDirective } from './app-password.directive';
import { UserView } from './components/user-view/user-view.component';
import { ExptetionComponent } from './components/exptetion/exptetion.component';
import { PolicyComponent } from './components/policy/policy.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ManagerViewPropertiesComponent } from './components/manager-view-properties/manager-view-properties.component';
import {CaptchaModule} from 'primeng/captcha';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {GMapModule} from 'primeng/gmap';


@NgModule({
    imports: [
        GMapModule,
        GooglePlaceModule,
        CaptchaModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        ReactiveFormsModule,
        FormsModule,
        SignaturePadModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyD5ivfn9WcgpMIA1EISkQsVfxM1KzsAmEQ',
          libraries: ['places'] 
        })
    ],
    
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        AppRightpanelComponent,
        AppInlineProfileComponent,
        DashboardDemoComponent,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent, MenusDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        UtilsDemoComponent,
        DocumentationComponent,
        ExptetionComponent,
        
        AboutComponent,
        HowItWorksComponent,
        AddPropertyComponent,
        SignUpComponent,
        ViewPropertyComponent,
        AllPropertiesComponent,
        LoginComponent,
        HomePageComponent,
        ContactComponent,
        UserView,
        ForgotPasswordComponent,
        AppPasswordDirective, 
        PolicyComponent, ManagerViewPropertiesComponent, ManagerHomeComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService, CountryService, EventService, NodeService, BreadcrumbService, ClientsService, PropertyService, LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
