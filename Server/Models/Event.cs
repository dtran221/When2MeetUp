using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Event
    {
        public int? Id {get; set; }
        public string EventName {get; set;}
        public DateTime DateOrDay {get; set;}
        public int StartTime {get; set;}
        public int EndTime {get; set;}
        public string TimeZone {get; set;}
        public string commentToAttendees {get; set;}
    }
}