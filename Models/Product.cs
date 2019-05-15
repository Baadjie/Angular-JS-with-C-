using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Product
    {

        public int Id;
        public string ProductType;
        public string ProductSubType;

        public string TrainingType;
        public int LogUserId;
        public DateTime LogDate;


        public Product(int id, string productType, string productSubType, string trainingType, int logUserId, DateTime logDate)
        {

            Id = id;
            ProductType = productType;
            ProductSubType = productType;
            TrainingType = trainingType;
            LogUserId = logUserId;
            LogDate = logDate;


        }

        public Product()
        {


        }

    }
}