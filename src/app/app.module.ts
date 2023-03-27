import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { ComponenteComponent } from './pages/componente/componente.component';
import { IncorporacionComponent } from './pages/incorporacion/incorporacion.component';
import { UnidadManejoComponent } from './pages/unidad-manejo/unidad-manejo.component';
import { RegimenComponent } from './pages/regimen/regimen.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
// #fake-end#

// import { ActivoModule } from './pages/activo/activo.module';
// import { ActivoComponent } from './pages/activo/activo.component';
// import { GrupoComponent } from './pages/grupos/grupos.component';
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, ComponenteComponent, IncorporacionComponent, UnidadManejoComponent, RegimenComponent, RegionalComponent, DepartamentoComponent],
  // declarations: [AppComponent, GrupoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
