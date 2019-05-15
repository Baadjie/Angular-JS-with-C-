using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Name
    {

        public int Id;
        public string ProductType;
        public string ProductSubType;
       

        public Name(int id, string productType, string productSubType)
        {

            Id = id;
            ProductType = productType;
            ProductSubType = productSubType;
        }
        public Name(int id, string productType)
        {

            Id = id; 
            ProductType = productType;
        }
        public Name()
        {


        }



    }
}