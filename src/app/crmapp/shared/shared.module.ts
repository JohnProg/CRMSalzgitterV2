import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
//import { FlexLayoutModule, } from '@angular/flex-layout';


import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentChipsModule } from '@covalent/core/chips';
import { CovalentStepsModule } from '@covalent/core/steps';



import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import { NgxChartsModule } from '@swimlane/ngx-charts';

// const FLEX_LAYOUT_MODULES: any[] = [
//   FlexLayoutModule,
// ];


const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule,
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatDividerModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatRadioModule, MatDialogModule, MatChipsModule,
  MatDatepickerModule, MatMomentDateModule, MatNativeDateModule,
  MatExpansionModule, 

  MatAutocompleteModule, MatStepperModule, MatTreeModule,
  MatBadgeModule, MatProgressSpinnerModule, MatProgressBarModule,
  MatPaginatorModule, MatSortModule
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

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const CRM_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
   // FLEX_LAYOUT_MODULES,
  ],
  declarations: [

  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
   // FLEX_LAYOUT_MODULES,
  ],
  providers: [
  
      
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

      {provide: MAT_DATE_FORMATS, useValue: CRM_FORMATS},
    
    
  ]
})
export class SharedModule { }
