using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Category
    {
        public int Id
        {
            get;
            set;
        }
        public int SubCatId
        {
            get;
            set;
        }
        public string CatName
        {
            get;
            set;
        }
        public string SubCatName
        {
            get;
            set;
        }
        public string ImgPath
        {
            get;
            set;
        }

        //public Category()
        //{ }
    }
  
}