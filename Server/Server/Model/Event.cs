using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model
{
    public class Event
    {
        int EventID { get; set; }
        [Required]
        string EventName { get; set; }
        [Required]
        string StartTime { get; set; }
        [Required]
        string EndTime { get; set; }
        [Required]
        string SelectedTimeZone { get; set; }
        string CommentFromCreator { get; set; }
        [Required]
        string DateDayToggle { get; set; }
        List<DateTime> SelectedDates { get; set; }
        List<DateTime> SelectdDays { get; set; }
    }
}
