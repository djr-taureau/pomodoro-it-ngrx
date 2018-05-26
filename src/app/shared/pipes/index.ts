
import { NgModule } from '@angular/core';

import { MinuteSecondsPipe} from './timer-pipe';

export const PIPES = [MinuteSecondsPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
