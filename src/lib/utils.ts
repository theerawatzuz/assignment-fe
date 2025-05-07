export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Format: วันที่ DD เดือน YYYY เวลา HH:MM น.
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("th-TH", options).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
