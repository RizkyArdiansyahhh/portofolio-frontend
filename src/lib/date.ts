export function formatPeriod(
  startDate: string,
  endDate?: string | null,
  locale: string = "id-ID"
): string {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(locale, {
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Sekarang"; // atau "Present"
  return `${start} – ${end}`;
}
