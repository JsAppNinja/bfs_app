namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Thin OnLine customer model used for search capabilites
    /// </summary>
    public class SearchCustomerModel
    {
        //arnum	arnum2	arnum3	arname	arlname	arfname	arsort	aradd1	aradd2	arcity	arstate	arzip	phone1	phone2	arfax	email
        //26115	26115	26115	BEECHWOOD HOMES, INC.			BEECHWOOD HOMES, INC.	2401 YORK ROAD  ATTN:KIM CAVANAUGH  TIMONIUM MD	21093	410-560-1182	410-560-1182	410-560-1187	

        public int arnum { get; set; }
        public int arnum2 { get; set; }
        public int arnum3 { get; set; }
        public string arname { get; set; }
        public string aradd1 { get; set; }
        public string aradd2 { get; set; }
        public string arcity { get; set; }
        public string arstate { get; set; }
        public string arzip { get; set; }
        public string phone1 { get; set; }
        public string phone2 { get; set; }
        public string arfax { get; set; }
        public string email { get; set; }

        public SearchCustomerModel() { }

        public SearchCustomerModel(int arnum, int arnum2, int arnum3, string arname, string aradd1, string aradd2, string arcity, string arstate, string arzip, string phone1, string phone2, string arfax, string email)
        {
            this.arnum = arnum;
            this.arnum2 = arnum2;
            this.arnum3 = arnum3;
            this.arname = arname;
            this.aradd1 = aradd1;
            this.aradd2 = aradd2;
            this.arcity = arcity;
            this.arstate = arstate;
            this.arzip = arzip;
            this.phone1 = phone1;
            this.phone2 = phone2;
            this.arfax = arfax;
            this.email = email;
        }
    }
}