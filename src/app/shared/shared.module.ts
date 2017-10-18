import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule,
  CovalentFileModule, CovalentChipsModule,
} from '@covalent/core';


import {CdkTableModule} from '@angular/cdk/table'
import {OverlayModule} from '@angular/cdk/overlay';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { NgxChartsModule, } from '@swimlane/ngx-charts';


const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
      // CDk
      CdkTableModule,
      OverlayModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, 
  CovalentExpansionPanelModule, CovalentFileModule, CovalentChipsModule,
];

const CHART_MODULES: any[] = [
  NgxChartsModule,
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES,
    
  ],
  declarations: [

  ],
  providers: [
  ], // additional providers needed for this module  
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES,
    
  ]
})
export class SharedModule { }
