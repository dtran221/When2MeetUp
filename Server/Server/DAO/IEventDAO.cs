using Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAO
{
    public interface IEventDAO
    {
        public bool AddEventInfo(Event inputEvent);
    }
}
