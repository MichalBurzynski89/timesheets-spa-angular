import { CallbackComponent } from './callback.component';
import { CallbackRoutingModule } from './callback-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, CallbackRoutingModule],
  declarations: [CallbackComponent],
})
export class CallbackModule {}
