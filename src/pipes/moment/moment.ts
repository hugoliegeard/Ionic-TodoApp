import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";
import "moment/locale/fr";

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date: string) {
    return moment(date, "YYYY-MM-DD").fromNow();
  }
}
