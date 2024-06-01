import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateEmail'
})
export class TruncateEmailPipe implements PipeTransform {

  transform(email: string, length: number = 20): string {
    if (email.length > length) {
      return `${email.substring(0, length)}...`;
    }
    return email;
  }
}
