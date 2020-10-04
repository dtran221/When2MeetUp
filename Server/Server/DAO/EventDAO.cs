using Server.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAO
{
    public class EventDAO : IEventDAO
    {
        public string Connectionstring { get; set; }

        string GetEventInfoSQL = "SELECT Name, Start_Time, End_time, Time_Zone, Comment, Date_Day FROM Event_Info WHERE Id = @eventId;";
        string GetEventDatesSQL = "SELECT Selected_Dates FROM Event_Dates WHERE Event_Id = @eventId;";
        string CreateEventSQL = "INSERT INTO Event_Info (Name, Start_Time, End_time, Time_Zone, Comment, Date_Day) VALUES (@Name, @Start_Time, @End_time, @Time_Zone, @Comment, @Date_Day); SELECT CAST(SCOPE_IDENTITY() AS int);";
        string AddDateToEventSQL = "INSERT INTO Event_Dates (Event_Id, Selected_Dates) VALUES (@Event_Id, @Selected_Dates);";

        public EventDAO(string connection)
        {
            Connectionstring = connection;
        }

        public Event GetEventInfo(int eventId)
        {
            Event eventData = new Event();
            using (SqlConnection conn = new SqlConnection(Connectionstring))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(GetEventInfoSQL, conn))
                {
                    cmd.Parameters.AddWithValue("@eventId", eventId);
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            eventData.EventId = eventId;
                            eventData.EventName = Convert.ToString(reader["Name"]);
                            eventData.StartTime = Convert.ToString(reader["Start_Time"]);
                            eventData.EndTime = Convert.ToString(reader["End_time"]);
                            eventData.SelectedTimeZone = Convert.ToString(reader["Time_Zone"]);
                            eventData.CommentFromCreator = Convert.ToString(reader["Comment"]);
                            eventData.DateDayToggle = Convert.ToString(reader["Date_Day"]);
                        }
                    }
                }

                using (SqlCommand cmd = new SqlCommand(GetEventDatesSQL, conn))
                {
                    cmd.Parameters.AddWithValue("@eventId", eventId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            eventData.Dates.Add(Convert.ToInt64(reader["Selected_Dates"]));
                        }
                    }
                }
            }
            return eventData;
        }

        public bool AddEventInfo(Event inputEvent)
        {
            bool result = false;


            using (SqlConnection conn = new SqlConnection(Connectionstring))
            {

                conn.Open();
                SqlCommand cmd = new SqlCommand(CreateEventSQL, conn);
                cmd.Parameters.AddWithValue("@Name", inputEvent.EventName);
                cmd.Parameters.AddWithValue("@Start_Time", inputEvent.StartTime);
                cmd.Parameters.AddWithValue("@End_time", inputEvent.EndTime);
                cmd.Parameters.AddWithValue("@Time_Zone", inputEvent.SelectedTimeZone);
                cmd.Parameters.AddWithValue("@Comment", inputEvent.CommentFromCreator);
                cmd.Parameters.AddWithValue("@Date_Day", inputEvent.DateDayToggle);


                inputEvent.EventId = (int)cmd.ExecuteScalar();
                int datesAdded = 0;
                foreach (long date in inputEvent.Dates)
                {
                    cmd = new SqlCommand(AddDateToEventSQL, conn);
                    cmd.Parameters.AddWithValue("@Event_Id", inputEvent.EventId);
                    cmd.Parameters.AddWithValue("@Selected_Dates", date);
                    datesAdded += cmd.ExecuteNonQuery();
                }

                if (inputEvent.EventId != 0 && datesAdded > 0)
                {
                    result = true;
                }

            }

            return result;
        }
    }
}
