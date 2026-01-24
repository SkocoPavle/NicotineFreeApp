// DummyData.js

// Primer podataka za ceo godinu
export const yearlyData = [
  { value: 45, label: 'Jan' },
  { value: 52, label: 'Feb' },
  { value: 61, label: 'Mar' },
  { value: 58, label: 'Apr' },
  { value: 63, label: 'May' },
  { value: 72, label: 'Jun' },
  { value: 80, label: 'Jul' },
  { value: 85, label: 'Aug' },
  { value: 78, label: 'Sep' },
  { value: 71, label: 'Oct' },
  { value: 68, label: 'Nov' },
  { value: 75, label: 'Dec' },
];

// Primer podataka za sedmicu
export const weeklyData = [
  { value: 30, label: 'Mon' },
  { value: 45, label: 'Tue' },
  { value: 55, label: 'Wed' },
  { value: 50, label: 'Thu' },
  { value: 60, label: 'Fri' },
  { value: 75, label: 'Sat' },
  { value: 65, label: 'Sun' },
];

// Funkcija koja generiše random podatke po danima meseca
export const generateMonthlyData = (year, month) => {
  // month 0-11, dan 0 = poslednji dan prethodnog meseca
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => ({
    value: Math.floor(Math.random() * 50) + 30, // random između 30 i 79
    label: `${index + 1}`, // dan u mesecu
  }));
};

// Trenutni mesec
const currentDate = new Date();
export const monthlyData = generateMonthlyData(
  currentDate.getFullYear(),
  currentDate.getMonth() // NE +1, monthIndex 0-11
);
