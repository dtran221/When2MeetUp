using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Server.Controllers
{
    [Route("")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            // string path = @"..\Event Creation Page\index.html";
            // return new ContentResult {
            // ContentType = "text/html",
            // StatusCode = (int)HttpStatusCode.OK,
            // Content = System.IO.File.ReadAllText(path)};
            return "wrong";
        }
    }
}
