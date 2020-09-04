using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Models
{    public class Event
    {
        public int? EventId {get; set; }
        
        [Required]
        public string EventName {get; set;}
         [Required]
        public String DateDayToggle {get; set;}
        [Required]
        public List<DateTime> SelectedDates {get; set;}
        [Required]
        public List<DateTime> SelectedDays {get; set;}
        [Required]
        public string StartTime {get; set;}
        [Required]
        public string EndTime {get; set;}
        [Required]
        public string SelectedTimeZone {get; set;}
        public string CommentFromCreator {get; set;}

        public Event()
        {
            
        }
    }
}