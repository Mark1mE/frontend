export class DateFormatService {
  dateFormat(dateString: string) {
    dateString = new Date(dateString).toLocaleDateString().replace('/', '-').replace('/', '-')
      + ' ' + new Date(dateString).toTimeString().split(' ')[0];
    return dateString;
  }
}
