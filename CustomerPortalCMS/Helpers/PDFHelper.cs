using System;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;


namespace CustomerPortalCMS.Helpers
{
    public static class PDFHelper
    {

        /// <summary>
        /// Generates a basic Pdf page with a simple content paragraph.
        /// Used when the genero service won't return a requested document, for whatever reason.
        /// </summary>
        /// <param name="content">The content to display in the Pdf document.</param>
        /// <returns>The Pdf as a byte string, ready for appreding/returning to the client.</returns>
        public static byte[] GenerateDummyPdf(string subject, string content)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                Document pdfDoc = new Document(PageSize.A4, 25, 25, 30, 30);
                PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, stream);
                pdfWriter.CloseStream = false;

                pdfDoc.AddAuthor("Builders FirstSource (c) Customer Portal");
                pdfDoc.AddAuthor("Builders FirstSource (c) Customer Portal");
                pdfDoc.AddSubject(subject);
                pdfDoc.AddTitle(subject);
                pdfDoc.Open();
                pdfDoc.Add(new Paragraph(content));
                pdfDoc.Close();
                pdfWriter.Close();

                return stream.ToArray();

            }
        }

        /// <summary>
        /// Call this method first to start the append operation.
        /// </summary>
        /// <param name="destinationStream">Stream (e.g. MemoryStream) to associate with the output of the append operations.</param>
        /// <returns>Returns a PdfCopy object that is bound to the passed in Stream.</returns>
        public static PdfCopy StartAppendOperation(Stream destinationStream)
        {
            try
            {
                Document pdfDoc = new Document(PageSize.A4);
                PdfCopy pdf = new PdfCopy(pdfDoc, destinationStream);
                pdfDoc.Open();
                pdf.CloseStream = false;

                return pdf;
            }
            catch (System.Exception ex)
            {
                throw new Exception("Unexpected error in StartAppendOperation.  See inner exception for additional details.", ex);
            }
        }

        /// <summary>
        /// After calling StartAppendOperation call this method to append streams (e.g. FileStrea, MemoryStream) to the passed in PdfCopy object.
        /// </summary>
        /// <param name="sourcePdfStream">Source pdf stream.</param>
        /// <param name="pdfOut">PdfCopy object created by StartAppendOperation</param>
        public static void AppendPDF(Stream sourcePdfStream, PdfCopy pdfOut)
        {
            try
            {
                // make sure the stream is spooled to the start
                sourcePdfStream.Seek(0, SeekOrigin.Begin);
                using (PdfReader pdfIn = new PdfReader(sourcePdfStream))
                {
                    pdfOut.AddDocument(pdfIn);
                }
            }
            catch (System.Exception ex)
            {
                throw new Exception("Unexpected error occurred in AppendPDF.  See inner exception for additional details.", ex);
            }
        }

        /// <summary>
        /// After calling StartAppendOperation call this method to append streams (e.g. FileStrea, MemoryStream) to the passed in PdfCopy object.
        /// </summary>
        /// <param name="sourcePdf">Source pdf bytearray.</param>
        /// <param name="pdfOut">PdfCopy object created by StartAppendOperation</param>
        public static void AppendPDF(byte[] sourcePdf, PdfCopy pdfOut)
        {
            try
            {
                using (PdfReader pdfIn = new PdfReader(sourcePdf))
                {
                    pdfOut.AddDocument(pdfIn);
                }
            }
            catch (System.Exception ex)
            {
                throw new Exception("Unexpected error occurred in AppendPDF.  See inner exception for additional details.", ex);
            }
        }
    }
}
