using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model
{
    public class Event
    {
        public int EventId { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public string StartTime { get; set; }
        [Required]
        public string EndTime { get; set; }
        [Required]
        public string SelectedTimeZone { get; set; }
        public string CommentFromCreator { get; set; }
        [Required]
        public string DateDayToggle { get; set; }
        [Required]
        public List<long> Dates { get; set; }

        public Event()
        {
            Dates = new List<long>();
        }
    }

    
}
