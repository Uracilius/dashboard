import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { MaterialModule } from 'src/assets/material/material.module';
import { ResumeMainComponent } from './resume-main/resume-main.component';
import { ResumeRoutingModule } from './resume-routing.module';
import { CertificationsComponent } from './components/certifications/certifications.component';



@NgModule({
  declarations: [
    ResumeMainComponent,
    InfoCardComponent,
    EducationComponent,
    ExperienceComponent,
    CertificationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
