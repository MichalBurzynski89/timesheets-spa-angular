import { ApprovalComponent } from './approval.component';
import { ApprovalRoutingModule } from './approval-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, ApprovalRoutingModule],
  declarations: [ApprovalComponent],
})
export class ApprovalModule {}
