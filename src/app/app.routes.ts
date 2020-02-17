import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AboutComponent } from './components/about/about.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewPropertyComponent } from './components/view-property/view-property.component';
import { AllPropertiesComponent } from './components/all-properties/all-properties.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserView } from './components/user-view/user-view.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExptetionComponent } from './components/exptetion/exptetion.component';
import { PolicyComponent } from './components/policy/policy.component';
import { ManagerViewPropertiesComponent } from './components/manager-view-properties/manager-view-properties.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },//component: path component
    { path: 'dashboard', component: DashboardDemoComponent },
    { path: 'sample', component: SampleDemoComponent },
    { path: 'forms', component: FormsDemoComponent },
    { path: 'data', component: DataDemoComponent },
    { path: 'panels', component: PanelsDemoComponent },
    { path: 'overlays', component: OverlaysDemoComponent },
    { path: 'menus', component: MenusDemoComponent },
    { path: 'messages', component: MessagesDemoComponent },
    { path: 'misc', component: MiscDemoComponent },
    { path: 'empty', component: EmptyDemoComponent },
    { path: 'charts', component: ChartsDemoComponent },
    { path: 'file', component: FileDemoComponent },
    { path: 'utils', component: UtilsDemoComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'about', component: AboutComponent },
    { path: 'add-property/:id', component: AddPropertyComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'add-property', component: AddPropertyComponent },
    { path: 'view-property/:id', component: ViewPropertyComponent },
    { path: 'all-properties', component: AllPropertiesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'userView', component: UserView },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'exptetion/:id', component: ExptetionComponent },
    { path: 'exptetion', component: ExptetionComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'policy/:id', component: PolicyComponent },
    { path: 'managerHome', component: ManagerHomeComponent },
    { path: 'manager_view_properties', component: ManagerViewPropertiesComponent }


];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
