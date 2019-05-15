using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class OutstandiningTraining
    {
        public string Name;
        public string TrainingType;
        public string ProductSubType;
        public string ProductType;
        public string TrainingCheckAll;
        public string Position;
        public string Department;

        public OutstandiningTraining()
        { }
        public OutstandiningTraining(string name, string productType, string productSubType, string trainingType, string trainingCheckAll, string position, string department)
        {
          
            Name = name;
            ProductType = productType;
            ProductSubType = productSubType;
            TrainingType = trainingType;
            TrainingCheckAll = trainingCheckAll;
            Position = position;
            Department = department;

        }
    }
}