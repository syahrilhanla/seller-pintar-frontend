export const formatDate = (date: Date, fullTime?: boolean) => {
  if (fullTime) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    // Format: April 13, 2025 10:55:12
    const formatted = new Intl.DateTimeFormat("en-US", options).format(date);
    return formatted.replace(",", "");
  }

  // Default: only date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};