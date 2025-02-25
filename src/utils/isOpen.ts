export function isOpen(schedule: any) {
    const now = new Date();
    let currentDay = now.getUTCDay(); 
    const currentHours = now.getUTCHours();
    const currentMinutes = now.getUTCMinutes();
  
    currentDay = (currentDay + 6) % 7;
  
    const todaySchedule = schedule[currentDay];
  
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  

    if(todaySchedule === null) {
        return true;
    }

    for (let i = 0; i < todaySchedule.length - 1; i++) {
        const openTime = todaySchedule[i];
        const closeTime = todaySchedule[i + 1];
  
        const openTimeInMinutes = openTime.h * 60 + openTime.m;
        const closeTimeInMinutes = closeTime.h * 60 + closeTime.m;
  
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
  