export function isOpen(schedule: any) {
  const now = new Date();
  let currentDay = now.getDay();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  currentDay = (currentDay + 6) % 7; 

  const todaySchedule = schedule[currentDay];

  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  console.log('Текущее время:', currentTimeInMinutes, 'минут');
  console.log('Расписание на сегодня:', todaySchedule);

  for (let i = 0; i < todaySchedule.length - 1; i++) {
      const openTime = todaySchedule[i];
      const closeTime = todaySchedule[i + 1];

      const openTimeInMinutes = openTime.h * 60 + openTime.m;
      const closeTimeInMinutes = closeTime.h * 60 + closeTime.m;

      console.log(`Интервал работы: с ${openTime.h}:${openTime.m} до ${closeTime.h}:${closeTime.m}`);

      if (closeTimeInMinutes < openTimeInMinutes) {
          if (currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes < closeTimeInMinutes) {
              return true; 
          }
      } else {
          if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
              return true; 
          }
      }
  }

  return false;
}