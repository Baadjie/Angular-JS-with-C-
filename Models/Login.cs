using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX
{
    public class Login
    {
        public int Id;
        public string Username { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }

        public Login(string username)
        {
            this.Password = username;
        }
        public Login()
        {

        }
        public Login(int id,string username, string password, string roles)
        {
            this.Id = id;
            this.Password = username;
            this.Username = password;
            this.Roles = roles;
        }



    }
}