using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAO
{
    public class EventDAO : IEventDAO
    {
        public string Connectionstring { get; set; }

        public EventDAO(string connection)
        {

            Connectionstring = connection;
        }

        public bool AddEventInfo(EventArgs inputEvent)
        {
            throw new NotImplementedException();
        }
    }
}
