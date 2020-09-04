using System;
using System.Collections.Generic;
using Models;

namespace DAO
{
    public class EventDao 
    {

        private static List<Event> Events = new List<Event>();
        
        public List<Event> GetEvents()
        {
            Event newEvent = new Event();
            newEvent.EventId = 1;
            newEvent.EventName = "TEST EVENT NAME";
            newEvent.DateDayToggle = "Dates in a Month";
            newEvent.StartTime = "9 AM";
            newEvent.EndTime = "9 PM";
            newEvent.SelectedTimeZone = "timezone test";
            newEvent.CommentFromCreator = "TEST Comment";
            newEvent.SelectedDates = new List<DateTime> {new DateTime(2011, 6, 10),new DateTime(2012, 6, 10)};
            Events.Add(newEvent);
            return Events;
        }

        public List<Event> Add(Event eventToAdd)
        {
            if (!eventToAdd.EventId.HasValue)
            {
                eventToAdd.EventId = Events.Count + 1;
            }
            Events.Add(eventToAdd);
            return Events;

        }

    }
}
