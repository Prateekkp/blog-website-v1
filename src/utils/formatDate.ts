export function formatDateShort(isoDate: string): string {
  const date = new Date(isoDate + (isoDate.includes('T') ? '' : 'T00:00:00'));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateFull(isoDate: string): string {
  const date = new Date(isoDate + (isoDate.includes('T') ? '' : 'T00:00:00'));
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
