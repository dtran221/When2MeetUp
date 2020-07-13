using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Models
{    public class Event
    {
        
        public int? Id {get; set; }
        
        [Required]
        public string EventName {get; set;}
        [Required]
        public List<DateTime> DateOrDay {get; set;}
        [Required]
        public int StartTime {get; set;}
        [Required]
        public int EndTime {get; set;}
        [Required]
        public string TimeZone {get; set;}
        [Required]
        public string CommentToAttendees {get; set;}

        public Event()
        {
            
        }

        public Event(string eventName, List<DateTime> dateOrDay, int startTime, int endTime, string timeZone, string commentToAttendees)
        {
            this.EventName = eventName;
            this.DateOrDay = dateOrDay;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.TimeZone = timeZone;
            this.CommentToAttendees = commentToAttendees;
        }
    }
}