using XININX_TrainingX.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Serialization;
using System.IO;

namespace XININX_TrainingX
{
    /// <summary>
    /// Summary description for TrainingService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]

    [System.Web.Script.Services.ScriptService]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class TrainingService : System.Web.Services.WebService
    {
        string trainingConnection = ConfigurationManager.ConnectionStrings["ConnectionString1"].ConnectionString;
        //Retrive Training Information
        [WebMethod]
        public List<ProductTraining> GetList()
        {
            List<ProductTraining> productTrainingList = new List<ProductTraining>();
            DataSet ds = new DataSet();

            SqlConnection conn2 = new SqlConnection(trainingConnection);


            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "usp_Training_GetTrainingInfo";
                cmd.Connection = conn2;
                conn2.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {
                    ProductTraining productTraining = new ProductTraining();

                    productTraining.Id = Convert.ToInt32(read["Id"]);
                    productTraining.Name = Convert.ToString(read["Name"]);

                    productTraining.DateCompleted = Convert.ToDateTime(read["DateCompleted"]);
                    productTraining.Verified = Convert.ToDateTime(read["Verified"]);
                    productTraining.EmployeeID = Convert.ToInt32(read["EmployeeID"]);
                    productTraining.ProductId = Convert.ToInt32(read["ProductId"]);
                    productTraining.ProductName = Convert.ToString(read["ProductName"]);
                    productTraining.TrainingProvidedBy = Convert.ToString(read["TrainingProvidedBy"]);
                    productTraining.TypeOfAssessment = Convert.ToString(read["TypeOfAssessment"]);
                    productTraining.ExpectationForCompetence = Convert.ToString(read["ExpectationForCompetence"]);
                    productTraining.OutcomeStatus = Convert.ToString(read["OutcomeStatus"]);
                    productTraining.Comment = Convert.ToString(read["Comment"]);
                    //productTraining.FileName = Convert.ToString(read["FileName"]);
                    //productTraining.Path = Convert.ToString(read["Path"]);
                    //productTraining.FileName2 = Convert.ToString(read["FileName2"]);
                    //productTraining.Path2 = Convert.ToString(read["Path2"]);

                    productTrainingList.Add(productTraining);
                  
                }
                

            }

            return productTrainingList;


        }


        [WebMethod]
        public void GetOutstandingList()
        {
            List<OutstandiningTraining> OutstandingTraining = new List<OutstandiningTraining>();
            DataSet ds = new DataSet();

            SqlConnection con = new SqlConnection(trainingConnection);


            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "usp_Training_GetOutstandingTraining";
                cmd.Connection = con;
                con.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {
                    OutstandiningTraining outstandingTraining = new OutstandiningTraining();


                    outstandingTraining.Name = Convert.ToString(read["Name"]);
                    outstandingTraining.ProductType = Convert.ToString(read["ProductType"]);
                    outstandingTraining.ProductSubType = Convert.ToString(read["ProductSubType"]);
                    outstandingTraining.TrainingType = Convert.ToString(read["TrainingType"]);
                    outstandingTraining.TrainingCheckAll = Convert.ToString(read["TrainingCheckAll"]);
                    outstandingTraining.Position = Convert.ToString(read["Position"]);
                    outstandingTraining.Department = Convert.ToString(read["Department"]);

                    OutstandingTraining.Add(outstandingTraining);

                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Write(js.Serialize(OutstandingTraining));
            }
        }
        //Get Products
        [WebMethod]

        public List<Product> GetProducts()
        {
            List<Product> products = new List<Product>();
            DataSet ds = new DataSet();

            SqlConnection conn2 = new SqlConnection(trainingConnection);


            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "usp_Training_GetProduct";
                cmd.Connection = conn2;
                conn2.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {


                    Product product = new Product();

                    product.Id = Convert.ToInt32(read["Id"]);
                    product.ProductType = Convert.ToString(read["ProductType"]);

                    product.ProductSubType = Convert.ToString(read["ProductSubType"]);
                    product.TrainingType = Convert.ToString(read["TrainingType"]);
                    product.LogUserId = Convert.ToInt32(read["LogUserId"]);
                    //product.LogDate = Convert.ToDateTime(read["LogDate"]);


                    products.Add(product);

                }


            }

            return products;


        }


        [WebMethod]
        //Deleting Training Info
        public void Delete(int Id)
        {
            SqlConnection conn2 = new SqlConnection(trainingConnection);

            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;
                    //cmd.CommandText = "delete from TrainingInfo where Id=@Id;";
                    // cmd.CommandText = "update TrainingInfo set IsDeleted=1 where Id=@Id;";     WORKING
                    cmd.CommandText = "usp_Training_DTrainingInfo";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", Id);


                    conn2.Open();
                    cmd.ExecuteNonQuery();
                    conn2.Close();
                }
            }
        }


        [WebMethod]
        //Deleting Product Info
        public void DeleteProduct(int Id)
        {
            SqlConnection conn2 = new SqlConnection(trainingConnection);

            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;

                    cmd.CommandText = "usp_Training_DProduct";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", Id);


                    conn2.Open();
                    cmd.ExecuteNonQuery();
                    conn2.Close();
                }
            }
        }


        //[WebMethod]
        ////Update Training Info

        //public void Edit(int Id, int EmployeeID, int ProductId, string TrainingProvidedBy, string TypeOfAssessment, string ExpectationForCompetence,/* string OutcomeStatus,*/ string Comment)
        //{


        //    SqlConnection conn2 = new SqlConnection(trainingConnection);

        //    {
        //        using (SqlCommand cmd = new SqlCommand())
        //        {
        //            cmd.Connection = conn2;



        //            cmd.CommandText = "usp_Training_UTrainingInfo";
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@EmployeeID", EmployeeID);
        //            cmd.Parameters.AddWithValue("@ProductId", ProductId);
        //            cmd.Parameters.AddWithValue("@Id", Id);

        //            cmd.Parameters.AddWithValue("@TrainingProvidedBy", TrainingProvidedBy);
        //            cmd.Parameters.AddWithValue("@TypeOfAssessment", TypeOfAssessment);

        //            cmd.Parameters.AddWithValue("@ExpectationForCompetence", ExpectationForCompetence);
        //            //cmd.Parameters.AddWithValue("@OutcomeStatus", OutcomeStatus);
        //            cmd.Parameters.AddWithValue("@Comment", Comment);

        //            conn2.Open();
        //            cmd.ExecuteNonQuery();
        //            conn2.Close();
        //        }
        //    }
        //}


        [WebMethod]
        //Update Training Info
        public void Edit(int Id, int EmployeeID, int ProductId, string TrainingProvidedBy, string TypeOfAssessment, string ExpectationForCompetence,/* string OutcomeStatus,*/ string Comment, FileData fileData, string LogUserId)
        {
            //Get Consultant name

            List<Names> names = new List<Names>();
            string Consultant = "";
            SqlConnection conn = new SqlConnection(trainingConnection);
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "SELECT ConsultantName FROM MasterFileEmployees WHERE EmployeeID='" + EmployeeID + "'";
                cmd.Connection = conn;
                conn.Open();
                SqlDataReader read = cmd.ExecuteReader();
                while (read.Read())
                {
                    Names name = new Names();
                    name.ConsultantName = Convert.ToString(read["ConsultantName"]);
                    Consultant = name.ConsultantName.ToString();
                }
            }


            //Get product sub type
            List<Product> products = new List<Product>();
            string product_sub_type = "";
            SqlConnection con = new SqlConnection(trainingConnection);
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "SELECT ProductSubType FROM Training_Product WHERE Id='" + ProductId + "'";
                cmd.Connection = con;
                con.Open();
                SqlDataReader read = cmd.ExecuteReader();
                while (read.Read())
                {
                    Product product = new Product();
                    product.ProductSubType = Convert.ToString(read["ProductSubType"]);
                    product_sub_type = product.ProductSubType.ToString();
                }
            }

            byte[] imageBytes = Convert.FromBase64String("");
            byte[] imageBytes2 = Convert.FromBase64String("");

            string filePath = "";
            string filePath2 = "";
            //Create file or folder
            if (fileData.FileName != "")
            {
                imageBytes = Convert.FromBase64String(fileData.Data);
                // Specify a "currently active folder"
                //string activeDir = @"c:\Training_Document";
                //filePath = System.IO.Path.Combine(activeDir, Consultant, product_sub_type);


                string activeDir = @"\\\\XINIXSERVER\\c$\\Training_Document\";
                //Create a new subfolder under the current active folder
                string NewPath = activeDir + "\\" + Consultant + "\\" + product_sub_type;
                 filePath = System.IO.Path.Combine(activeDir, NewPath);

                // Create the subfolder
                System.IO.Directory.CreateDirectory(filePath);
                // Create a new file name. This example generates
                // a random string.
                string newFileName = EmployeeID + "_" + DateTime.Now.ToString("yyyyMMdd_hhmmss") + "_" + fileData.FileName;

                // Combine the new file name with the path
                filePath = System.IO.Path.Combine(filePath, newFileName);
                System.IO.File.WriteAllBytes(filePath, imageBytes);
            }
            if (fileData.FileName2 != "")
            {
                imageBytes2 = Convert.FromBase64String(fileData.Data);
                // Specify a "currently active folder"
                // string activeDir2 = @"c:\Training_Document";
                //string activeDir2 = @"c:\Training_Document";
                //filePath2 = System.IO.Path.Combine(activeDir2, Consultant, product_sub_type);


                string activeDir2 = @"\\\\XINIXSERVER\\c$\\Training_Document\";
                //Create a new subfolder under the current active folder
                string NewPath2 = activeDir2 + "\\" + Consultant + "\\" + product_sub_type;
                 filePath2 = System.IO.Path.Combine(activeDir2, NewPath2);

                // Create the subfolder
                System.IO.Directory.CreateDirectory(filePath2);
                // Create a new file name. This example generates
                // a random string.
                string newFileName2 = EmployeeID + "_" + DateTime.Now.ToString("yyyyMMdd_hhmmss") + "_" + fileData.FileName2;

                // Combine the new file name with the path
                filePath2 = System.IO.Path.Combine(filePath2, newFileName2);
                System.IO.File.WriteAllBytes(filePath2, imageBytes2);
            }




            SqlConnection conn2 = new SqlConnection(trainingConnection);
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;

                    cmd.CommandText = "usp_Training_UTrainingInfo";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", Id);
                    cmd.Parameters.AddWithValue("@EmployeeID", EmployeeID);
                    cmd.Parameters.AddWithValue("@ProductId", ProductId);

                    cmd.Parameters.AddWithValue("@TrainingProvidedBy", TrainingProvidedBy);
                    cmd.Parameters.AddWithValue("@TypeOfAssessment", TypeOfAssessment);
                    cmd.Parameters.AddWithValue("@ExpectationForCompetence", ExpectationForCompetence);
                    cmd.Parameters.AddWithValue("@Comment", Comment);
                    
                    cmd.Parameters.AddWithValue("@LogUserId", LogUserId);

                    conn2.Open();
                    cmd.ExecuteNonQuery();
                    conn2.Close();
                }
            }

            if (fileData.FileName != "")
            {
                SqlConnection conn1 = new SqlConnection(trainingConnection);
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn1;

                        cmd.CommandText = "usp_Training_UTrainingInfo_Files";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TrainingId", Id);
                        cmd.Parameters.AddWithValue("@ContentType", imageBytes);
                        cmd.Parameters.AddWithValue("@FileName", fileData.FileName);
                        cmd.Parameters.AddWithValue("@Path", filePath);
                        cmd.Parameters.AddWithValue("@LogUserId", LogUserId);
                        conn1.Open();
                        cmd.ExecuteNonQuery();
                        //TrainingId = Convert.ToInt32(cmd.ExecuteScalar());
                        conn1.Close();
                    }
                }
            }
            if (fileData.FileName2 != "")
            {
                SqlConnection conn1 = new SqlConnection(trainingConnection);
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn1;

                        cmd.CommandText = "usp_Training_UTrainingInfo_Files";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TrainingId", Id);
                        cmd.Parameters.AddWithValue("@ContentType", imageBytes2);
                        cmd.Parameters.AddWithValue("@FileName", fileData.FileName2);
                        cmd.Parameters.AddWithValue("@Path", filePath2);
                        cmd.Parameters.AddWithValue("@LogUserId", LogUserId);

                        conn1.Open();
                        cmd.ExecuteNonQuery();
                        conn1.Close();
                    }
                }
            }


           
        }


        
        //Insert Product Information
        [WebMethod]
        public void Save(int EmployeeID, int ProductId, DateTime DateCompleted, DateTime VerifiedDate, string TrainingProvidedBy, string TypeOfAssessment, string ExpectationForCompetence, string OutcomeStatus, string Comment, FileData fileData,string LogUserId)
        {
            int TrainingId = 0;
            //Get consultant name
            List<Names> names = new List<Names>();
            string Consultant = "";
            SqlConnection conn2 = new SqlConnection(trainingConnection);
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "SELECT ConsultantName FROM MasterFileEmployees WHERE EmployeeID='" + EmployeeID + "'";
                cmd.Connection = conn2;
                conn2.Open();
                SqlDataReader read = cmd.ExecuteReader();
                while (read.Read())
                {
                    Names name = new Names();
                    name.ConsultantName = Convert.ToString(read["ConsultantName"]);
                    Consultant = name.ConsultantName.ToString();
                }
            }

            //Get product type
            List<Product> products = new List<Product>();
            string product_sub_type = "";
            SqlConnection con = new SqlConnection(trainingConnection);
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "SELECT ProductSubType FROM Training_Product WHERE Id='" + ProductId + "'";
                cmd.Connection = con;
                con.Open();
                SqlDataReader read = cmd.ExecuteReader();
                while (read.Read())
                {
                    Product product = new Product();
                    product.ProductSubType = Convert.ToString(read["ProductSubType"]);
                    product_sub_type = product.ProductSubType.ToString();
                }
            }
            //if (fileData.FileName != "" && fileData.FileName2 != "")
            //{
            //byte[] imageBytes = Convert.FromBase64String(fileData.Data);
            //string filePath = @"C:\\Training_Document\\" + EmployeeID +"_"+ DateTime.Now.ToString("yyyyMMdd_hhmmss")+"_" + fileData.FileName;
            //System.IO.File.WriteAllBytes(filePath, imageBytes);

            //byte[] imageBytes2 = Convert.FromBase64String(fileData.Data);
            //string filePath2 = @"C:\\Training_Document\\" + fileData.FileName2;
            //System.IO.File.WriteAllBytes(filePath2, imageBytes2);

            byte[] imageBytes = Convert.FromBase64String("");
            byte[] imageBytes2 = Convert.FromBase64String("");

            string filePath = "";
            string filePath2 = "";
            //Create file or folder
            if (fileData.FileName != "")
            {
                imageBytes = Convert.FromBase64String(fileData.Data);
                // Specify a "currently active folder"
                //string activeDir = @"c:\Training_Document";
                //filePath = System.IO.Path.Combine(activeDir, Consultant, product_sub_type);


                string activeDir = @"\\\\XINIXSERVER\\c$\\Training_Document\";
                //Create a new subfolder under the current active folder
                string NewPath = activeDir + "\\" + Consultant + "\\" + product_sub_type;
                 filePath = System.IO.Path.Combine(activeDir, NewPath);

                // Create the subfolder
                System.IO.Directory.CreateDirectory(filePath);
                // Create a new file name. This example generates
                // a random string.
                string newFileName = EmployeeID + "_" + DateTime.Now.ToString("yyyyMMdd_hhmmss") + "_" + fileData.FileName;

                // Combine the new file name with the path
                filePath = System.IO.Path.Combine(filePath, newFileName);
                System.IO.File.WriteAllBytes(filePath, imageBytes);
            }
            if (fileData.FileName2 != "")
            {
                imageBytes2 = Convert.FromBase64String(fileData.Data);
                // Specify a "currently active folder"
                // string activeDir2 = @"c:\Training_Document";
                //string activeDir2 = @"c:\Training_Document";
                //filePath2 = System.IO.Path.Combine(activeDir2, Consultant, product_sub_type);


                string activeDir2 = @"\\\\XINIXSERVER\\c$\\Training_Document\";
                //Create a new subfolder under the current active folder
                string NewPath2 = activeDir2 + "\\" + Consultant + "\\" + product_sub_type;
                 filePath2 = System.IO.Path.Combine(activeDir2, NewPath2);

                // Create the subfolder
                System.IO.Directory.CreateDirectory(filePath2);
                // Create a new file name. This example generates
                // a random string.
                string newFileName2 = EmployeeID + "_" + DateTime.Now.ToString("yyyyMMdd_hhmmss") + "_" + fileData.FileName2;

                // Combine the new file name with the path
                filePath2 = System.IO.Path.Combine(filePath2, newFileName2);
                System.IO.File.WriteAllBytes(filePath2, imageBytes2);
            }              




                SqlConnection conn = new SqlConnection(trainingConnection);
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        
                        cmd.CommandText = "usp_Training_ITrainingInfo";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@EmployeeID", EmployeeID);
                        cmd.Parameters.AddWithValue("@ProductId", ProductId);
                        cmd.Parameters.AddWithValue("@DateCompleted", DateCompleted);
                        cmd.Parameters.AddWithValue("@VerifiedDate", VerifiedDate);
                        cmd.Parameters.AddWithValue("@TrainingProvidedBy", TrainingProvidedBy);
                        cmd.Parameters.AddWithValue("@TypeOfAssessment", TypeOfAssessment);

                        cmd.Parameters.AddWithValue("@ExpectationForCompetence", ExpectationForCompetence);
                        cmd.Parameters.AddWithValue("@OutcomeStatus", OutcomeStatus);
                        cmd.Parameters.AddWithValue("@Comment", Comment);
                      
                        //cmd.Parameters.AddWithValue("@ContentType2", imageBytes2);
                        //cmd.Parameters.AddWithValue("@FileName2", fileData.FileName2);
                        //cmd.Parameters.AddWithValue("@Path2", filePath2);
                        cmd.Parameters.AddWithValue("@LogUserId", LogUserId);
                        conn.Open();
                        //cmd.ExecuteNonQuery();
                        TrainingId = Convert.ToInt32(cmd.ExecuteScalar());
                        conn.Close();
                    }
                }

            if (fileData.FileName != "")
            {
                SqlConnection conn1 = new SqlConnection(trainingConnection);
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn1;

                        cmd.CommandText = "usp_Training_ITrainingInfo_Files";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TrainingId", TrainingId);                        
                        cmd.Parameters.AddWithValue("@ContentType", imageBytes);
                        cmd.Parameters.AddWithValue("@FileName", fileData.FileName);
                        cmd.Parameters.AddWithValue("@Path", filePath);                        
                        cmd.Parameters.AddWithValue("@LogUserId", LogUserId);
                        conn1.Open();
                        cmd.ExecuteNonQuery();
                        //TrainingId = Convert.ToInt32(cmd.ExecuteScalar());
                        conn1.Close();
                    }
                }
            }
            if(fileData.FileName2 != "")
            {
                SqlConnection conn1 = new SqlConnection(trainingConnection);
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn1;

                        cmd.CommandText = "usp_Training_ITrainingInfo_Files";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TrainingId", TrainingId);
                        cmd.Parameters.AddWithValue("@ContentType", imageBytes2);
                        cmd.Parameters.AddWithValue("@FileName", fileData.FileName2);
                        cmd.Parameters.AddWithValue("@Path", filePath2);
                        cmd.Parameters.AddWithValue("@LogUserId", LogUserId);
                        conn1.Open();
                        cmd.ExecuteNonQuery();
                        //TrainingId = Convert.ToInt32(cmd.ExecuteScalar());
                        conn1.Close();
                    }
                }
            }

           

        }

        //get file from database
        [WebMethod]
        public void GetFile(/*int trainingId*/)
        {
            List<Document> files = new List<Document>();
            SqlConnection conn2 = new SqlConnection(trainingConnection);

            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "usp_Training_GetFile";
                cmd.Connection = conn2;
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@trainingId", trainingId);
                //cmd.Parameters.AddWithValue("@ProductId", ProductId);
                conn2.Open();
                SqlDataReader read = cmd.ExecuteReader();
                
                while (read.Read())
                {
                    Document fileDoc = new Document();

                    fileDoc.Id = Convert.ToInt32(read["Id"]);
                    fileDoc.TrainingId = Convert.ToInt32(read["TrainingId"]);
                    fileDoc.FileName = Convert.ToString(read["FileName"]);
                    fileDoc.Path = Convert.ToString(read["Path"]);
                    files.Add(fileDoc);
                }


            }
            //return files;
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(files));
        }

        [WebMethod]
       public void DownloadFile(int Id)
        {
            HttpResponse response = HttpContext.Current.Response;
            //int id = int.Parse((sender as LinkButton).CommandArgument);
            byte[] bytes;
            string fileName, path;
            string constr = ConfigurationManager.ConnectionStrings["ConnectionString1"].ConnectionString;
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = "usp_Training_GetFile";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", Id);
                    cmd.Connection = con;
                    con.Open();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        sdr.Read();
                        bytes = (byte[])sdr["ContentType"];
                        path = sdr["Path"].ToString();
                        //contentType = sdr["ContentType"].ToString();
                        fileName = sdr["FileName"].ToString();
                    }
                    con.Close();
                }
            }
            response.Clear();
            response.Buffer = true;
            response.Charset = "";
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            response.ContentType = path;
            response.AppendHeader("Content-Disposition", "attachment; Filename=" + fileName);
            response.BinaryWrite(bytes);
            response.Flush();
            response.End();
        }


       


        [WebMethod]
        //Update Product Info

        public void EditProduct(int Id, string ProductType, string ProductSubType, string TrainingType, int DepartmentId)
        {


            SqlConnection conn2 = new SqlConnection(trainingConnection);

            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;



                    cmd.CommandText = "usp_Training_UProductInfo";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Id", Id);
                    cmd.Parameters.AddWithValue("@ProductType", ProductType);
                    cmd.Parameters.AddWithValue("@ProductSubType", ProductSubType);
                    cmd.Parameters.AddWithValue("@TrainingType", TrainingType);
                    cmd.Parameters.AddWithValue("@DepartmentId", DepartmentId);


                    conn2.Open();
                    cmd.ExecuteNonQuery();
                    conn2.Close();
                }
            }
        }




        //Employee Drop down
        [WebMethod]
        public List<Names> GetDropList()
        {
            List<Names> names = new List<Names>();
            //DataSet ds = new DataSet();

            SqlConnection conn2 = new SqlConnection(trainingConnection);



            using (SqlCommand cmd = new SqlCommand())
            {

                cmd.CommandText = "usp_Training_GetEmployeeDropList";
                cmd.Connection = conn2;
                cmd.CommandType = CommandType.StoredProcedure;
                conn2.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {
                    Names name = new Names();

                    name.EmployeeID = Convert.ToInt32(read["EmployeeID"]);
                    name.FirstName = Convert.ToString(read["FirstName"]);
                    name.LastName = Convert.ToString(read["LastName"]);
                    name.ConsultantName = Convert.ToString(read["ConsultantName"]);




                    names.Add(name);

                }


            }

            return names;


        }

        //Product Drop down
        [WebMethod]

        public List<Name> GetProduct()
        {
            List<Name> name = new List<Name>();
            DataSet ds = new DataSet();

            SqlConnection conn2 = new SqlConnection(trainingConnection);
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;
                    cmd.CommandText = "select Id,ProductType,ProductSubType from Training_Product order by ProductSubType ;";
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }
                }
            }
            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)

                    // names.Add(new Names(int.Parse(dr["Id"].ToString()), dr["FirstName"].ToString(), dr["LastName"].ToString(), dr["Gender"].ToString(), dr["Title"].ToString(), dr["Address"].ToString(), dr["ContactNumber"].ToString()));
                    name.Add(new Name(int.Parse(dr["Id"].ToString()), dr["ProductType"].ToString(), dr["ProductSubType"].ToString()));



            }

            return name;
        }



        //Get department Id
        [WebMethod]
        public List<Department> GetDepartmentList()
        {
            List<Department> departments = new List<Department>();
            //DataSet ds = new DataSet();

            SqlConnection conn = new SqlConnection(trainingConnection);



            using (SqlCommand cmd = new SqlCommand())
            {

                cmd.CommandText = "usp_Training_GetDepartment";
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                SqlDataReader read = cmd.ExecuteReader();

                while (read.Read())
                {
                    Department department = new Department();

                    department.Id = Convert.ToInt32(read["Id"]);
                    department.Name = Convert.ToString(read["Name"]);

                    departments.Add(department);
                }
            }
            return departments;
        }





        //Add product
        [WebMethod]
        public void AddProduct(string ProductType, string ProductSubType, string TrainingType, int DepartmentId/*, DateTime LogDate*/)
        {
            SqlConnection conn2 = new SqlConnection(trainingConnection);

            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;

                    //cmd.CommandText = "insert into TrainingInfo (EmpId,ProductId,DateCompleted,Verified,TrainingProviderBy,TypeOfAssessment,Expectation,OutcomeStatus,Comment)" +
                    //    " values (@EmpId,@ProductId,@DateCompleted,@Verified,@TrainingProviderBy,@TypeOfAssessment,@Expectation,@OutcomeStatus,@Comment);";

                    cmd.CommandText = "usp_Training_IProduct";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ProductType", ProductType);
                    cmd.Parameters.AddWithValue("@ProductSubType", ProductSubType);
                    cmd.Parameters.AddWithValue("@TrainingType", TrainingType);
                    cmd.Parameters.AddWithValue("@DepartmentId", DepartmentId);
                    //cmd.Parameters.AddWithValue("@LogDate", LogDate);

                    conn2.Open();
                    cmd.ExecuteNonQuery();
                    conn2.Close();


                }


            }

        }




        [WebMethod]
        public List<Name> GetProductType()
        {
            List<Name> name = new List<Name>();
            DataSet ds = new DataSet();

            SqlConnection conn2 = new SqlConnection(trainingConnection);
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn2;
                    cmd.CommandText = "select Id,ProductType from Training_Product where IsDeleted='False' ;";
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }
                }
            }
            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)

                    // names.Add(new Names(int.Parse(dr["Id"].ToString()), dr["FirstName"].ToString(), dr["LastName"].ToString(), dr["Gender"].ToString(), dr["Title"].ToString(), dr["Address"].ToString(), dr["ContactNumber"].ToString()));
                    name.Add(new Name(int.Parse(dr["Id"].ToString()), dr["ProductType"].ToString()));



            }

            return name;


        }


        //[WebMethod]
        //public void SaveImage(FileData fileData/*,int TrainingID*/)
        //{
        //    if (!string.IsNullOrEmpty(fileData.FileName))
        //    {

        //        byte[] imageBytes = Convert.FromBase64String(fileData.Data);
        //        string filePath = "~/Images/" + fileData.FileName;
        //        System.IO.File.WriteAllBytes(Server.MapPath(filePath), imageBytes);

        //        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString1"].ConnectionString);
        //        {

        //            using (SqlCommand cmd = new SqlCommand())
        //            {
        //                cmd.Connection = conn;



        //                cmd.CommandText = "usp_IFile";
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                cmd.Parameters.AddWithValue("@FileName", fileData.FileName);
        //                cmd.Parameters.AddWithValue("@Path", filePath);
        //                //cmd.Parameters.AddWithValue("@TrainingID", TrainingID);
        //                conn.Open();
        //                cmd.ExecuteNonQuery();
        //                conn.Close();
        //            }
        //        }
        //    }
        //}

        public class FileData
        {
            public string FileName { get; set; }
            public string Data { get; set; }
        public string FileName2 { get; set; }
        public string Data2 { get; set; }
    }
       



    }
}