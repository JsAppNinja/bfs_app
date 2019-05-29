using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using CustomerPortalCMS.Models.UI;

namespace CustomerPortalCMS.Models
{
    public class MarketLocations
    {
        public List<MarketLocation> MarketLocation { get; set; }

        public MarketLocations()
        {
            MarketLocation = new List<MarketLocation>();
        }
    }
    public class MarketLocation
    {
        public string Name { get; set; }
        public LocationDetails Details { get; set; }
    }
    public class LocationDetails
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string State { get; set; }
        public string Phone { get; set; }
    }

    public class CustomerHome
    {
        [DataType(DataType.Currency)]
        public decimal AmountDue { get; set; }
        //public List<Delivery> Deliveries { get; set; }
        public MemberModel Customer { get; set; }
        [DataType(DataType.Currency)]
        [DisplayFormat(DataFormatString = "{0:#,#.00}")]
        public decimal Current { get; set; }
        [DataType(DataType.Currency)]
        [DisplayFormat(DataFormatString = "{0:#,#.00}")]
        public decimal Net30 { get; set; }
        [DataType(DataType.Currency)]
        public decimal Net60 { get; set; }
        [DataType(DataType.Currency)]
        public decimal Net90 { get; set; }
        
        [DataType(DataType.Currency)]
        public decimal NetGT90 { get; set; }
        //[DataType(DataType.Currency)]
        //public decimal AvailableCredit { get; set; }
        //[DataType(DataType.Currency)]
        //public decimal CreditLimit { get; set; }
        //public List<Invoices> Invoices { get; set; }
        public List<MarketLocation> MarketLocations { get; set; }
        public List<ActiveJob> ActiveJobs { get; set; }

        public CustomerHome() {
            MarketLocations = new List<MarketLocation>();
            //Deliveries = new List<Delivery>();
            //Invoices = new List<Invoices>();
            ActiveJobs = new List<ActiveJob>();
        }
    }
    public class Order
    {
        public string SalesOrder { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        [DataType(DataType.Currency)]
        public decimal Amount { get; set; }
        public string EnteredBy { get; set; }
        public string Status { get; set; }

    }
    public class Delivery
    {
        public string PickTicket { get; set; }
        public DateTime Date { get; set; }
        public string SalesOrder { get; set; }
        public string EnteredBy { get; set; }
        public string Category { get; set; }
    }

    public class Invoices
    {
        public string Invoice { get; set; }
        public string SalesOrder { get; set; }
        public DateTime TransDate { get; set; }
        public string TransType { get; set; }
        public string CustomerRef { get; set; }
        [DataType(DataType.Currency)]
        public decimal Invoice_Amt { get; set; }
        public string Category { get; set; }
    }

    //Sort Order for this query is Picktickets then Invoices
    public class ActiveJob
    {
        public string JobId { get; set; }
        public string JobDescription { get; set; }
        public int SalesOrderCount { get; set; }
        public DateTime SalesOrderRecentDate { get; set; }
        public int InvoiceCount { get; set; }
        public DateTime InvoiceRecentDate { get; set; }
        public int PickTicketCount { get; set; }
        public DateTime PickTicketRecentDate { get; set; }
        public List<Order> Orders { get; set; }
        public List<Delivery> Deliveries { get; set; }
        public List<Invoices> Invoices { get; set; }

        public ActiveJob() {
            Orders = new List<Order>();
            Deliveries = new List<Delivery>();
            Invoices = new List<Invoices>();
        }
    }
}