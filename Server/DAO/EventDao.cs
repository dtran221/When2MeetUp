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
            newEvent.Id = 1;
            newEvent.EventName = "TEST EVENT NAME";
            newEvent.DateOrDay = new List<DateTime> {new DateTime(2011, 6, 10),new DateTime(2012, 6, 10)};
            newEvent.StartTime = 9;
            newEvent.EndTime = 15;
            newEvent.TimeZone = "timezone test";
            newEvent.CommentToAttendees = "TEST Comment";
            Events.Add(newEvent);
            return Events;
        }

        public List<Event> Add(Event eventToAdd)
        {
            if (!eventToAdd.Id.HasValue)
            {
                eventToAdd.Id = Events.Count + 1;
            }
            Events.Add(eventToAdd);
            return Events;

        }

    }
}
