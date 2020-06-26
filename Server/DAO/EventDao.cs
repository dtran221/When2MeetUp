using System;
using System.Collections.Generic;
using Models;

namespace DAO
{
    public class EventDao 
    {

        private static List<Event> Events { get; set; }

        public List<Event> GetEvents()
        {
            return Events;
        }

        public List<Event> Add(Event eventToAdd)
        {
            eventToAdd.Id = Events.Count + 1;
            Events.Add(eventToAdd);
            return Events;

        }

    }
}
