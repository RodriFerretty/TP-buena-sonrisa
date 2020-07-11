import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term): any {
    // console.log('term', term);
    
    // return term ? items.filter(item => item.status.indexOf(term) !== -1): items;

    return term ? items.filter(item => {
      let formattedFilterDate = term.toDateString();
      // console.log("Formatted filter date in PIPE:", term)
      let formattedItemDate = new Date(item.date.seconds * 1000).toDateString();
      // console.log("Formatted item date in PIPE:", formattedItemDate)
      return formattedItemDate.indexOf(formattedFilterDate) !== -1
    }): items;
}

}
