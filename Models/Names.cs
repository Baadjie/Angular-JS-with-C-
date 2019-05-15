using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Names
    {


        public int Id;
        public string FirstName;
        public string LastName;
        public string Gender;
        public string Title;
        public string Address;
        public string ContactNumber;
        public string ConsultantName;


        //public string LastName;

        public int EmployeeID;

        public Names(int id, string firstname, string lastname, string gender, string title, string address, string contactNumber)
        {

            Id = id;
            FirstName = firstname;
            LastName = lastname;
            Gender = gender;
            Title = title;
            Address = address;
            ContactNumber = contactNumber;


        }

        public Names(int empID, string firstname, string lastname, string consultantName)
        {


            EmployeeID = empID;
            FirstName = firstname;
            LastName = lastname;
            ConsultantName = consultantName;

        }

        public Names()
        {


        }



    }
}