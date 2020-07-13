using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using DAO;
using Microsoft.AspNetCore.Cors;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private static EventDao dao = new EventDao ();
        // GET api/values
        [HttpGet]
        public ActionResult<List<Event>> Get()
        {
            return dao.GetEvents();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        
        [HttpPost]
        public ActionResult<Event> Post(Event inputEvent)
        {
            List<Event> returnEvent = dao.Add(inputEvent);
            return Ok(returnEvent);
        }
    }
}
