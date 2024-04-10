export function getIndianStandardTime(givenDate: string): string {
  const dateObject = new Date(givenDate);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();

  const indianDateFormat = `${day}-${month}-${year}`;

  return indianDateFormat;
}
