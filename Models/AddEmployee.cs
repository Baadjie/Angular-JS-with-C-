using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX
{
    public class AddEmployee
    {
        public int EmployeeID;
        public string LastName;
        public string FirstName;
        public Decimal IdentityNo;
        public DateTime DateOfBirth;
        public DateTime DateOfAppointment;
        public string Status1;
        public string SubStatus;
        public string Position;
        public string Department;
        public string Category;
        public string GradeNo;
        public string ExtensionNo;
        public int MobilePhone;
        public int OldMobilePhone;
        public string EmailAddress1;
        public string ConsultantName;
        public string ConsultantAKA;
        public string TeamName;
        public string TeamLeader;
        public string TeamLeaderExtensionNo;
        public string IDBadge;
        public string AccessLevel;
        public DateTime LogDate;
        public string UserName;
        //public string Spare1;
        //public string Spare2;
        //public string Spare3;
        //public string Spare4;

        public AddEmployee()
        { }

        public AddEmployee(int employeeID, string lastName, string firstName, Decimal identityNo, DateTime dateOfBirth, DateTime dateOfAppointment, string status1, string subStatus, string position, string department, string category,
        string gradeNo,
         string extensionNo,
        int mobilePhone,
        int oldMobilePhone,
         string emailAddress1,
        string consultantName,
       string consultantAKA,
        string teamName,
        string teamLeader,
      string teamLeaderExtensionNo,
         string iDBadge,
        string accessLevel,
        DateTime logDate,
        string userName
       // string spare1,
       //string spare2,
       // string spare3,
       //  string spare4
       )
        {
            EmployeeID = employeeID;
            LastName = lastName;
            FirstName = firstName;
            IdentityNo = identityNo;
            DateOfBirth = dateOfBirth;
            DateOfAppointment = dateOfAppointment;
            Status1 = status1;
            SubStatus = subStatus;
            Position = position;
            Department = department;
            Category = category;
            GradeNo = gradeNo;
            ExtensionNo = extensionNo;
            MobilePhone = mobilePhone;
            OldMobilePhone = oldMobilePhone;
            EmailAddress1 = emailAddress1;
            ConsultantName = consultantName;
            ConsultantAKA = consultantAKA;
            TeamName = teamName;
            TeamLeader = teamLeader;
            TeamLeaderExtensionNo = teamLeaderExtensionNo;
            IDBadge = iDBadge;
            AccessLevel = accessLevel;
            LogDate = logDate;
            UserName = userName;
            //Spare1= spare1;
            //Spare2= spare2;
            //Spare3= spare3;
            //Spare4= spare4;

        }
    }
}