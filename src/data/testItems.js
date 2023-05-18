const generateItems = (numberOfDays) => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth(), numberOfDays);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const items = {};
  
    days.forEach((day) => {
      const dateString = format(day, 'yyyy-MM-dd');
      items[dateString] = [];
  
      const numberOfEvents = Math.floor(Math.random() * 3);
  
      for (let i = 0; i < numberOfEvents; i++) {
        items[dateString].push({
          text: `Event ${i + 1}`,
        });
      }
    });
  
    return items;
  };