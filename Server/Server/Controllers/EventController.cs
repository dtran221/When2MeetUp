using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.DAO;
using Server.Model;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        private readonly IEventDAO eventDao;

        public EventController(IEventDAO _eventDao)
        {
            eventDao = _eventDao;
        }

        [HttpGet]
        public IActionResult GetEvent(int eventId)
        {
            Event eventData = eventDao.
            
        }

        [HttpPost]
        public IActionResult CreateEvent([FromBody] Event inputEvent)
        {
            bool result = eventDao.AddEventInfo(inputEvent);
            if (result)
            {
                return Ok(inputEvent);
            }
            else
            {
                return BadRequest(new { message = "An error occurred and the event was not created." });
            }
            
        }
    }
}
