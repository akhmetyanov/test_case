import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileStructureTreeComponent } from './components/file-structure-tree/file-structure-tree.component';
import { FolderContentComponent } from './components/folder-content/folder-content.component';
import { SharedComponentsModule } from './components/shared-components/shared-components.module';
import { FolderContentItemsComponent } from './components/folder-content/folder-content-items/folder-content-items.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { FileExtentionPipe } from './services/file-structure/file-extention.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileStructureTreeComponent,
    FolderContentComponent,
    FolderContentItemsComponent,
    FileExtentionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    AngularSvgIconModule.forRoot(),
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
