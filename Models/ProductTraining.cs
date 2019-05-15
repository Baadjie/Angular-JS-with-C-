using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class ProductTraining
    {
        public int EmpId;
        public int ProductId;

        public int Id;
        public string Name;
        public string ProductName;
        public DateTime DateCompleted;
        public DateTime Verified;
        public string TrainingProvidedBy;
        public string TypeOfAssessment;
        public string ExpectationForCompetence;
        public string OutcomeStatus;
        public string Comment;
        //public string Path;
        //public string FileName;
        //public string FileName2;
        //public string Path2;




        public string TrainingType;
        public string ProductSubType;
        public string ProductType;
        public string TrainingCheckAll;
        public string Position;
        public string Department;
        public string FirstName;
        public string LastName;
        public int EmployeeID;


        public ProductTraining()
        {


        }

        public ProductTraining(int id, int empid, int productid, string productName, string name, DateTime dateCompleted, DateTime verified, string trainingProviderBy, string typeOfAssessment, string expectation, string outcomeStatus, string comment/*,string path,string fileName, string fileName2,string path2*/)
        {
            Id = id;
            ProductName = productName;
            Name = name;

            EmployeeID = empid;
            ProductId = productid;

            DateCompleted = dateCompleted;
            Verified = verified;
            TrainingProvidedBy = trainingProviderBy;
            TypeOfAssessment = typeOfAssessment;
            ExpectationForCompetence = expectation;
            OutcomeStatus = outcomeStatus;
            Comment = comment;
            //Path=path;
            //FileName=fileName;
            //FileName2=fileName2;
            //Path2 = path2;

    }

        public ProductTraining(/*int id,*/string name,string productType, string productSubType, string trainingType, string trainingCheckAll, string position, string department)
        {
            //Id = id;
            Name= name;
            ProductType=productType;
            ProductSubType = productSubType;
            TrainingType= trainingType;
            TrainingCheckAll = trainingCheckAll;
            Position= position;
            Department= department;

        }
        //public ProductTraining(int _empID, string firstname, string lastname)
        //{
        //    EmployeeID = _empID;
        //    FirstName = firstname;
        //    LastName = lastname;

        //}


        //public ProductTraining(int empID,string firstname,string lastname)
        //{

        //    EmployeeID = empID;
        //    FirstName = firstname;
        //    LastName = lastname;

        //}

        //public ProductTraining(int id, string productSubType)
        //{

        //    Id = id;
        //    ProductSubType = productSubType;
        //}



    }


}

