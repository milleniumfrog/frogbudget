export function normalizeDate(dateInput: string | number | Date) {
   let tmpDate = new Date(dateInput);
   return `${tmpDate.getFullYear()}-${lengthStr(String(tmpDate.getMonth()+1), 2)}-${lengthStr(tmpDate.getDate().toString(), 2)}`;
}

function lengthStr(str: string, wishedLength: number) {
   while(str.length < wishedLength)
	   str = "0" + str;
   return str;
}