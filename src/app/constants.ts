export const SITE_URL = 'www.meritoi.com';
export const COMPANY_NAME = 'Modify Visual Ltd';
export const BRAND_FULL = 'Merit Operational Intelligence';
export const COMPANY_ADDRESS = '20-22 Wenlock Road, London, N1 7GU, England';

export function monthYear(): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const d = new Date();
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}
