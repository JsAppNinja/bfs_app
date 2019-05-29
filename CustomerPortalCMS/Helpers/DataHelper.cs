using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Xml;
using System.Linq;

namespace CustomerPortalCMS
{

    /// <summary>
    /// Minimalistic Data Binding Framework that works with SQL Stored Procedures
    /// It is capable of of binding class properties to procs parapamters based on the object passed in
    /// </summary>

    public sealed class DataHelper : IDisposable
    {
        private SqlDataAdapter DataAdapter { get; set; }
        private SqlConnection Conn { get; set; }
        private SqlCommand Cmd { get; set; }

        private const BindingFlags BINDING_FLAGS = BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance;

        public DataHelper(string connString)
        {
            Initialize(connString);
        }

        public DataHelper(string connString, bool debugMode)
        {
            Initialize(connString);
        }

        private void Initialize(string connString)
        {
            this.DataAdapter = new SqlDataAdapter();
            this.Cmd = new SqlCommand();
            this.Conn = new SqlConnection();

            this.DataAdapter.SelectCommand = this.Cmd;

            this.Cmd.Connection = this.Conn;
            this.Conn.FireInfoMessageEventOnUserErrors = true;
            this.Conn.ConnectionString = connString;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~DataHelper()
        {
            Dispose(false);
        }

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                // free managed resources  
                if (Conn != null)
                {
                    Conn.Dispose();
                    Conn = null;
                }

                if (Cmd != null)
                {
                    Cmd.Dispose();
                    Cmd = null;
                }

                if (DataAdapter != null)
                {
                    DataAdapter.Dispose();
                    DataAdapter = null;
                }
            }
        }

        public DataSet GetData(String proc)
        {
            return GetData(proc, new object());
        }
        public DataSet GetData(String proc, String id)
        {
            return GetData(proc, new { Id = id });
        }

        public DataSet GetData(String proc, Int32 id)
        {
            return GetData(proc, new { Id = id });
        }

        public DataSet GetData(String proc, SqlParameter[] param)
        {
            return GetData(proc, param);
        }

        public DataSet GetData<T>(String proc, T obj)
        {
            PrepStatement(proc, obj);
            var ds = new DataSet();
            this.DataAdapter.Fill(ds);
            this.Conn.Close();
            return ds;
        }

        public DataTable GetDataTable(String proc)
        {
            var ds = GetData(proc, new object());
            return ds.Tables.Count > 0 ? ds.Tables[0] : null;
        }

        public DataTable GetDataTable(String proc, String id)
        {
            var ds = GetData(proc, new { Id = id });
            return ds.Tables.Count > 0 ? ds.Tables[0] : null;
        }

        public DataTable GetDataTable(String proc, Int32 id)
        {
            var ds = GetData(proc, new { Id = id });
            return ds.Tables.Count > 0 ? ds.Tables[0] : null;
        }

        public DataTable GetDataTable(String proc, SqlParameter[] param)
        {
            var ds = GetData(proc, param as Object);
            return ds.Tables.Count > 0 ? ds.Tables[0] : null;
        }

        public DataTable GetDataTable<T>(String proc, T obj)
        {
            var ds = GetData(proc, obj);
            return ds.Tables.Count > 0 ? ds.Tables[0] : null;
        }

        public List<T> GetDataAndBindToObj<T>(String pro, T obj) where T : new()
        {
            var dt = GetDataTable(pro, obj);
            return BindDtToObj<T>(dt);
        }

        public XmlDocument GetXML(String proc)
        {
            return GetXML(proc, new object());
        }

        public XmlDocument GetXML(String proc, String id)
        {
            return GetXML(proc, new { Id = id });
        }

        public XmlDocument GetXML(String proc, Int32 id)
        {
            return GetXML(proc, new { Id = id });
        }

        public XmlDocument GetXML(String proc, SqlParameter[] param)
        {
            return GetXML(proc, param);
        }

        public XmlDocument GetXML<T>(String proc, T obj)
        {
            PrepStatement(proc, obj);
            if (this.Conn.State != ConnectionState.Open)
                this.Conn.Open();

            var doc = new XmlDocument();
            using (var reader = this.Cmd.ExecuteXmlReader())
            {
                reader.MoveToContent();
                var node = doc.ReadNode(reader);

                if (node != null)
                    doc.AppendChild(node);
            }

            this.Conn.Close();
            return doc;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities")]
        private void PrepStatement<T>(String proc, T obj)
        {
            if (this.Conn.State == ConnectionState.Closed)
                this.Conn.Open();

            this.Cmd.CommandType = CommandType.StoredProcedure;
            this.Cmd.CommandText = proc;

            if (obj is SqlParameter[])
            {
                this.Cmd.Parameters.Clear();
                this.Cmd.Parameters.AddRange(obj as SqlParameter[]);
            }
            else
            {
                SetParamaters(obj);
            }
        }

        private void SetParamaters<T>(T obj)
        {
            SqlCommandBuilder.DeriveParameters(this.Cmd);

            var columns = (
                          from param in this.Cmd.Parameters.Cast<SqlParameter>()
                          let pro = typeof(T).GetProperty(param.ParameterName.Remove(0, 1), BINDING_FLAGS)
                          where pro != null
                          select new { Param = param, Value = pro.GetValue(obj) }
                      ).ToList();

            columns.ForEach(i => i.Param.Value = i.Value);
        }

        private List<T> BindDtToObj<T>(DataTable dt) where T : new()
        {
            var list = new List<T>();

            if (dt != null)
                foreach (DataRow dr in dt.Rows)
                {
                    var o = new T();

                    var columns = (
                          from c in dt.Columns.Cast<DataColumn>()
                          let pro = typeof(T).GetProperty(c.ColumnName, BINDING_FLAGS)
                          where pro != null
                          select new { Property = pro, Type = pro.PropertyType, Value = dr[c] }
                      ).ToList();

                    columns.ForEach(i => i.Property.SetValue(o, Convert.ChangeType(i.Value, i.Type)));

                    list.Add(o);
                }

            return list;
        }

        public T BindCollectionToObj<T>(NameValueCollection col) where T : class, new()
        {
            var o = new T();

            var columns = (
                           from key in col.AllKeys
                           let pro = typeof(T).GetProperty(key, BINDING_FLAGS)
                           where pro != null
                           select new { Property = pro, Value = col[key], Type = pro.PropertyType }
                       ).ToList();

            columns.ForEach(pro => pro.Property.SetValue(o, Convert.ChangeType(pro.Value, pro.Type)));

            return o;
        }
    }
}