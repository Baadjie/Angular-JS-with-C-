using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace XININX_TrainingX
{
    /// <summary>
    /// Summary description for Login1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [System.Web.Script.Services.ScriptService]
    public class Login1 : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Login> LoginUser()
        {
            List<Login> users = new List<Login>();

            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString1"].ConnectionString);

            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = con;
                cmd.CommandText = "usp_Training_GetLogin";
                con.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {
                    Login user = new Login();
                    user.Id = Convert.ToInt32(read["Id"]);
                    user.Username = Convert.ToString(read["Username"]);

                    user.Password = Convert.ToString(read["Password"]);
                    user.Roles = Convert.ToString(read["Roles"]);


                    users.Add(user);

                }

            }


            return users;
        }
    }
}
