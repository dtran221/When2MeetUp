using Microsoft.EntityFrameworkCore;  
namespace Models
{    
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {

        }
        public DbSet<EventContext> TodoItems { get; set; } 
    }
}