import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
  standalone: true
})
export class TermTextPipe implements PipeTransform {

  transform(text : string): string {
    return text.split(" " , 2).join(" ");
  }

}
