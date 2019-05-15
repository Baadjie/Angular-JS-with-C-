using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XININX_TrainingX.Models
{
    public class Document
    {
        public int Id { get; set; }
        public int TrainingId { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
      
    }
}