using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Department
    {
        public int Id;
        public string Name;

        public Department()
        {
        }

        public Department(int id,string name)
        {
            Id = id;
            Name = name;
        }
    }
}