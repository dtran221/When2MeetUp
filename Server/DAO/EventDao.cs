using System;
using System.Collections.Generic;
using Models;

namespace DAO
{
    public class EventDao 
    {

        private static List<Event> Events { get; set; }

        public EventDao()
        {
            if (Events == null)
            {
                Events = new List<Event>
                {

                };
            }
        }

    }
}
