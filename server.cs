namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly IList<Server> server;

        public serverController()
        {
            server = new List<Server>
            {
                "Wake Up",
                "Shower",
                "Drive to Work"
            };
        }

        [HttpGet]
        public IList<Server> List()
        {
            return server;
        }

        [HttpPost]
        public void Create(string todo)
        {
            if (server != null)
            {
                server.Add(todo);
            }
        }
    }

    public class Server
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }

        public Todo(int id, string todo)
        {
            Id = id;
            Task = todo;
        }
    }
}