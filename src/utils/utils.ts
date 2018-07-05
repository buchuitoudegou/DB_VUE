export interface IDate {
  year: number,
  month: number,
  day: number
}
export function formatDate(date:string):IDate {
  let year = date.substring(0, 4);
  let month = date.substring(4, 6);
  let day = date.substring(6, 8);
  return {
      year: Number(year),
      month: Number(month),
      day: Number(day)
  }
}
export function checkDate(date:IDate) {
  if (!(date.year > 2000 && date.year < 2100))
    return false
  if (!(date.day > 0 && date.day < 31) || !(date.month >= 1 && date.month <= 12))
    return false
  switch(date.month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: if (date.day > 31) return false;break
    case 2: if (date.year % 400 == 0 || (date.year % 4 == 0 && date.year % 100 != 0)) {
      if (date.day > 29)
        return false  
    } else {
      if (date.day > 28)
        return false
    }
    break;
    default: if (date.day > 30) return false; break;
  }
  return true;
}