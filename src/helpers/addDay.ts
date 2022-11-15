export function addDays(date:any, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }