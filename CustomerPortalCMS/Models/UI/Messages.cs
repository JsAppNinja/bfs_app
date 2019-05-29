using System.CodeDom.Compiler;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.Resources;
using System.Runtime.CompilerServices;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    [CompilerGenerated]
    [GeneratedCode("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [DebuggerNonUserCode]
    public class Messages
    {
        private static ResourceManager resourceMan;
        private static CultureInfo resourceCulture;

        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Advanced)]
        public static ResourceManager ResourceManager
        {
            get
            {
                if (object.ReferenceEquals((object) Messages.resourceMan, (object) null))
                    Messages.resourceMan =
                        new ResourceManager("CustomerPortalCMS.Models.UI.Messages", typeof(Messages).Assembly);
                return Messages.resourceMan;
            }
        }

        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Advanced)]
        public static CultureInfo Culture
        {
            get { return Messages.resourceCulture; }
            set { Messages.resourceCulture = value; }
        }

        /// <summary>
        ///   Looks up a localized string similar to Add column on the left.
        /// </summary>
        public static string Editor_AddColumnLeft
        {
            get { return Messages.ResourceManager.GetString("Editor_AddColumnLeft", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Add column on the right.
        /// </summary>
        public static string Editor_AddColumnRight
        {
            get { return Messages.ResourceManager.GetString("Editor_AddColumnRight", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Add row above.
        /// </summary>
        public static string Editor_AddRowAbove
        {
            get { return Messages.ResourceManager.GetString("Editor_AddRowAbove", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Add row below.
        /// </summary>
        public static string Editor_AddRowBelow
        {
            get { return Messages.ResourceManager.GetString("Editor_AddRowBelow", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Background color.
        /// </summary>
        public static string Editor_BackColor
        {
            get { return Messages.ResourceManager.GetString("Editor_BackColor", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Bold.</summary>
        public static string Editor_Bold
        {
            get { return Messages.ResourceManager.GetString("Editor_Bold", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Insert hyperlink.
        /// </summary>
        public static string Editor_CreateLink
        {
            get { return Messages.ResourceManager.GetString("Editor_CreateLink", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Create table.
        /// </summary>
        public static string Editor_CreateTable
        {
            get { return Messages.ResourceManager.GetString("Editor_CreateTable", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Delete column.
        /// </summary>
        public static string Editor_DeleteColumn
        {
            get { return Messages.ResourceManager.GetString("Editor_DeleteColumn", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Are you sure you want to delete "{0}"?.
        /// </summary>
        public static string Editor_DeleteFile
        {
            get { return Messages.ResourceManager.GetString("Editor_DeleteFile", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Delete row.</summary>
        public static string Editor_DeleteRow
        {
            get { return Messages.ResourceManager.GetString("Editor_DeleteRow", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to or.</summary>
        public static string Editor_DialogButtonSeparator
        {
            get { return Messages.ResourceManager.GetString("Editor_DialogButtonSeparator", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Editor_DialogCancel
        {
            get { return Messages.ResourceManager.GetString("Editor_DialogCancel", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Insert.</summary>
        public static string Editor_DialogInsert
        {
            get { return Messages.ResourceManager.GetString("Editor_DialogInsert", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Update.</summary>
        public static string Editor_DialogUpdate
        {
            get { return Messages.ResourceManager.GetString("Editor_DialogUpdate", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to A directory with this name was not found..
        /// </summary>
        public static string Editor_DirectoryNotFound
        {
            get { return Messages.ResourceManager.GetString("Editor_DirectoryNotFound", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to drop files here to upload.
        /// </summary>
        public static string Editor_DropFilesHere
        {
            get { return Messages.ResourceManager.GetString("Editor_DropFilesHere", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Empty Folder.
        /// </summary>
        public static string Editor_EmptyFolder
        {
            get { return Messages.ResourceManager.GetString("Editor_EmptyFolder", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Select font family.
        /// </summary>
        public static string Editor_FontName
        {
            get { return Messages.ResourceManager.GetString("Editor_FontName", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to (inherited font).
        /// </summary>
        public static string Editor_FontNameInherit
        {
            get { return Messages.ResourceManager.GetString("Editor_FontNameInherit", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Select font size.
        /// </summary>
        public static string Editor_FontSize
        {
            get { return Messages.ResourceManager.GetString("Editor_FontSize", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to (inherited size).
        /// </summary>
        public static string Editor_FontSizeInherit
        {
            get { return Messages.ResourceManager.GetString("Editor_FontSizeInherit", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Color.</summary>
        public static string Editor_ForeColor
        {
            get { return Messages.ResourceManager.GetString("Editor_ForeColor", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Format.</summary>
        public static string Editor_FormatBlock
        {
            get { return Messages.ResourceManager.GetString("Editor_FormatBlock", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Format.</summary>
        public static string Editor_Formatting
        {
            get { return Messages.ResourceManager.GetString("Editor_Formatting", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Alternate text.
        /// </summary>
        public static string Editor_ImageAltText
        {
            get { return Messages.ResourceManager.GetString("Editor_ImageAltText", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Web address.</summary>
        public static string Editor_ImageWebAddress
        {
            get { return Messages.ResourceManager.GetString("Editor_ImageWebAddress", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Indent.</summary>
        public static string Editor_Indent
        {
            get { return Messages.ResourceManager.GetString("Editor_Indent", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Insert file.</summary>
        public static string Editor_InsertFile
        {
            get { return Messages.ResourceManager.GetString("Editor_InsertFile", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Insert HTML.</summary>
        public static string Editor_InsertHtml
        {
            get { return Messages.ResourceManager.GetString("Editor_InsertHtml", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Insert image.
        /// </summary>
        public static string Editor_InsertImage
        {
            get { return Messages.ResourceManager.GetString("Editor_InsertImage", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Insert ordered list.
        /// </summary>
        public static string Editor_InsertOrderedList
        {
            get { return Messages.ResourceManager.GetString("Editor_InsertOrderedList", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Insert unordered list.
        /// </summary>
        public static string Editor_InsertUnorderedList
        {
            get { return Messages.ResourceManager.GetString("Editor_InsertUnorderedList", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to The selected file "{0}" is not valid. Supported file types are {1}..
        /// </summary>
        public static string Editor_InvalidFileType
        {
            get { return Messages.ResourceManager.GetString("Editor_InvalidFileType", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Italic.</summary>
        public static string Editor_Italic
        {
            get { return Messages.ResourceManager.GetString("Editor_Italic", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Center text.</summary>
        public static string Editor_JustifyCenter
        {
            get { return Messages.ResourceManager.GetString("Editor_JustifyCenter", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Justify.</summary>
        public static string Editor_JustifyFull
        {
            get { return Messages.ResourceManager.GetString("Editor_JustifyFull", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Align text left.
        /// </summary>
        public static string Editor_JustifyLeft
        {
            get { return Messages.ResourceManager.GetString("Editor_JustifyLeft", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Align text right.
        /// </summary>
        public static string Editor_JustifyRight
        {
            get { return Messages.ResourceManager.GetString("Editor_JustifyRight", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Open link in new window.
        /// </summary>
        public static string Editor_LinkOpenInNewWindow
        {
            get { return Messages.ResourceManager.GetString("Editor_LinkOpenInNewWindow", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Text.</summary>
        public static string Editor_LinkText
        {
            get { return Messages.ResourceManager.GetString("Editor_LinkText", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to ToolTip.</summary>
        public static string Editor_LinkToolTip
        {
            get { return Messages.ResourceManager.GetString("Editor_LinkToolTip", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Web address.</summary>
        public static string Editor_LinkWebAddress
        {
            get { return Messages.ResourceManager.GetString("Editor_LinkWebAddress", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Arrange by:.</summary>
        public static string Editor_OrderBy
        {
            get { return Messages.ResourceManager.GetString("Editor_OrderBy", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Name.</summary>
        public static string Editor_OrderByName
        {
            get { return Messages.ResourceManager.GetString("Editor_OrderByName", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Size.</summary>
        public static string Editor_OrderBySize
        {
            get { return Messages.ResourceManager.GetString("Editor_OrderBySize", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Outdent.</summary>
        public static string Editor_Outdent
        {
            get { return Messages.ResourceManager.GetString("Editor_Outdent", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?.
        /// </summary>
        public static string Editor_OverwriteFile
        {
            get { return Messages.ResourceManager.GetString("Editor_OverwriteFile", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Search.</summary>
        public static string Editor_Search
        {
            get { return Messages.ResourceManager.GetString("Editor_Search", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Strikethrough.
        /// </summary>
        public static string Editor_Strikethrough
        {
            get { return Messages.ResourceManager.GetString("Editor_Strikethrough", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Styles.</summary>
        public static string Editor_Styles
        {
            get { return Messages.ResourceManager.GetString("Editor_Styles", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Subscript.</summary>
        public static string Editor_Subscript
        {
            get { return Messages.ResourceManager.GetString("Editor_Subscript", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Superscript.</summary>
        public static string Editor_Superscript
        {
            get { return Messages.ResourceManager.GetString("Editor_Superscript", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Underline.</summary>
        public static string Editor_Underline
        {
            get { return Messages.ResourceManager.GetString("Editor_Underline", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Remove hyperlink.
        /// </summary>
        public static string Editor_Unlink
        {
            get { return Messages.ResourceManager.GetString("Editor_Unlink", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Upload.</summary>
        public static string Editor_UploadFile
        {
            get { return Messages.ResourceManager.GetString("Editor_UploadFile", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to View HTML.</summary>
        public static string Editor_ViewHtml
        {
            get { return Messages.ResourceManager.GetString("Editor_ViewHtml", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to And.</summary>
        public static string Filter_And
        {
            get { return Messages.ResourceManager.GetString("Filter_And", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Filter_Cancel
        {
            get { return Messages.ResourceManager.GetString("Filter_Cancel", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Clear.</summary>
        public static string Filter_Clear
        {
            get { return Messages.ResourceManager.GetString("Filter_Clear", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Is equal to.</summary>
        public static string Filter_DateIsEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_DateIsEqualTo", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Is after.</summary>
        public static string Filter_DateIsGreaterThan
        {
            get { return Messages.ResourceManager.GetString("Filter_DateIsGreaterThan", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is after or equal to.
        /// </summary>
        public static string Filter_DateIsGreaterThanOrEqualTo
        {
            get
            {
                return Messages.ResourceManager.GetString("Filter_DateIsGreaterThanOrEqualTo",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Is before.</summary>
        public static string Filter_DateIsLessThan
        {
            get { return Messages.ResourceManager.GetString("Filter_DateIsLessThan", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is before or equal to.
        /// </summary>
        public static string Filter_DateIsLessThanOrEqualTo
        {
            get
            {
                return Messages.ResourceManager.GetString("Filter_DateIsLessThanOrEqualTo", Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is not equal to.
        /// </summary>
        public static string Filter_DateIsNotEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_DateIsNotEqualTo", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Is equal to.</summary>
        public static string Filter_EnumIsEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_EnumIsEqualTo", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is not equal to.
        /// </summary>
        public static string Filter_EnumIsNotEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_EnumIsNotEqualTo", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Filter.</summary>
        public static string Filter_Filter
        {
            get { return Messages.ResourceManager.GetString("Filter_Filter", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Show items with value that:.
        /// </summary>
        public static string Filter_Info
        {
            get { return Messages.ResourceManager.GetString("Filter_Info", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to is false.</summary>
        public static string Filter_IsFalse
        {
            get { return Messages.ResourceManager.GetString("Filter_IsFalse", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to is true.</summary>
        public static string Filter_IsTrue
        {
            get { return Messages.ResourceManager.GetString("Filter_IsTrue", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Is equal to.</summary>
        public static string Filter_NumberIsEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_NumberIsEqualTo", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is greater than.
        /// </summary>
        public static string Filter_NumberIsGreaterThan
        {
            get { return Messages.ResourceManager.GetString("Filter_NumberIsGreaterThan", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is greater than or equal to.
        /// </summary>
        public static string Filter_NumberIsGreaterThanOrEqualTo
        {
            get
            {
                return Messages.ResourceManager.GetString("Filter_NumberIsGreaterThanOrEqualTo",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is less than.
        /// </summary>
        public static string Filter_NumberIsLessThan
        {
            get { return Messages.ResourceManager.GetString("Filter_NumberIsLessThan", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is less than or equal to.
        /// </summary>
        public static string Filter_NumberIsLessThanOrEqualTo
        {
            get
            {
                return Messages.ResourceManager.GetString("Filter_NumberIsLessThanOrEqualTo", Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is not equal to.
        /// </summary>
        public static string Filter_NumberIsNotEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_NumberIsNotEqualTo", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Operator.</summary>
        public static string Filter_Operator
        {
            get { return Messages.ResourceManager.GetString("Filter_Operator", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Or.</summary>
        public static string Filter_Or
        {
            get { return Messages.ResourceManager.GetString("Filter_Or", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to -Select value-.
        /// </summary>
        public static string Filter_SelectValue
        {
            get { return Messages.ResourceManager.GetString("Filter_SelectValue", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Contains.</summary>
        public static string Filter_StringContains
        {
            get { return Messages.ResourceManager.GetString("Filter_StringContains", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Does not contain.
        /// </summary>
        public static string Filter_StringDoesNotContain
        {
            get { return Messages.ResourceManager.GetString("Filter_StringDoesNotContain", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Ends with.</summary>
        public static string Filter_StringEndsWith
        {
            get { return Messages.ResourceManager.GetString("Filter_StringEndsWith", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Is equal to.</summary>
        public static string Filter_StringIsEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_StringIsEqualTo", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Is not equal to.
        /// </summary>
        public static string Filter_StringIsNotEqualTo
        {
            get { return Messages.ResourceManager.GetString("Filter_StringIsNotEqualTo", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Starts with.</summary>
        public static string Filter_StringStartsWith
        {
            get { return Messages.ResourceManager.GetString("Filter_StringStartsWith", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Value.</summary>
        public static string Filter_Value
        {
            get { return Messages.ResourceManager.GetString("Filter_Value", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Grid_Cancel
        {
            get { return Messages.ResourceManager.GetString("Grid_Cancel", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cancel changes.
        /// </summary>
        public static string Grid_CancelChanges
        {
            get { return Messages.ResourceManager.GetString("Grid_CancelChanges", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Grid_CancelDelete
        {
            get { return Messages.ResourceManager.GetString("Grid_CancelDelete", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Select All.</summary>
        public static string Grid_CheckAll
        {
            get { return Messages.ResourceManager.GetString("Grid_CheckAll", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Columns.</summary>
        public static string Grid_Columns
        {
            get { return Messages.ResourceManager.GetString("Grid_Columns", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Column Settings.
        /// </summary>
        public static string Grid_ColumnSettings
        {
            get { return Messages.ResourceManager.GetString("Grid_ColumnSettings", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Are you sure you want to delete this record?.
        /// </summary>
        public static string Grid_Confirmation
        {
            get { return Messages.ResourceManager.GetString("Grid_Confirmation", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Delete.</summary>
        public static string Grid_ConfirmDelete
        {
            get { return Messages.ResourceManager.GetString("Grid_ConfirmDelete", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Add new record.
        /// </summary>
        public static string Grid_Create
        {
            get { return Messages.ResourceManager.GetString("Grid_Create", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Delete.</summary>
        public static string Grid_Destroy
        {
            get { return Messages.ResourceManager.GetString("Grid_Destroy", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Done.</summary>
        public static string Grid_Done
        {
            get { return Messages.ResourceManager.GetString("Grid_Done", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Edit.</summary>
        public static string Grid_Edit
        {
            get { return Messages.ResourceManager.GetString("Grid_Edit", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Export to Excel.
        /// </summary>
        public static string Grid_Excel
        {
            get { return Messages.ResourceManager.GetString("Grid_Excel", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Lock.</summary>
        public static string Grid_Lock
        {
            get { return Messages.ResourceManager.GetString("Grid_Lock", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to No records available..
        /// </summary>
        public static string Grid_NoRecords
        {
            get { return Messages.ResourceManager.GetString("Grid_NoRecords", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Export to PDF.
        /// </summary>
        public static string Grid_Pdf
        {
            get { return Messages.ResourceManager.GetString("Grid_Pdf", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Save changes.
        /// </summary>
        public static string Grid_SaveChanges
        {
            get { return Messages.ResourceManager.GetString("Grid_SaveChanges", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Select.</summary>
        public static string Grid_Select
        {
            get { return Messages.ResourceManager.GetString("Grid_Select", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Sort Ascending.
        /// </summary>
        public static string Grid_SortAscending
        {
            get { return Messages.ResourceManager.GetString("Grid_SortAscending", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Sort Descending.
        /// </summary>
        public static string Grid_SortDescending
        {
            get { return Messages.ResourceManager.GetString("Grid_SortDescending", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Unlock.</summary>
        public static string Grid_Unlock
        {
            get { return Messages.ResourceManager.GetString("Grid_Unlock", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Update.</summary>
        public static string Grid_Update
        {
            get { return Messages.ResourceManager.GetString("Grid_Update", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Drag a column header and drop it here to group by that column.
        /// </summary>
        public static string Group_Empty
        {
            get { return Messages.ResourceManager.GetString("Group_Empty", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to All.</summary>
        public static string Pager_AllPages
        {
            get { return Messages.ResourceManager.GetString("Pager_AllPages", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to {0} - {1} of {2} items.
        /// </summary>
        public static string Pager_Display
        {
            get { return Messages.ResourceManager.GetString("Pager_Display", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to No items to display.
        /// </summary>
        public static string Pager_Empty
        {
            get { return Messages.ResourceManager.GetString("Pager_Empty", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Go to the first page.
        /// </summary>
        public static string Pager_First
        {
            get { return Messages.ResourceManager.GetString("Pager_First", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to items per page.
        /// </summary>
        public static string Pager_ItemsPerPage
        {
            get { return Messages.ResourceManager.GetString("Pager_ItemsPerPage", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Go to the last page.
        /// </summary>
        public static string Pager_Last
        {
            get { return Messages.ResourceManager.GetString("Pager_Last", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to More pages.</summary>
        public static string Pager_MorePages
        {
            get { return Messages.ResourceManager.GetString("Pager_MorePages", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Go to the next page.
        /// </summary>
        public static string Pager_Next
        {
            get { return Messages.ResourceManager.GetString("Pager_Next", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to of {0}.</summary>
        public static string Pager_Of
        {
            get { return Messages.ResourceManager.GetString("Pager_Of", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Page.</summary>
        public static string Pager_Page
        {
            get { return Messages.ResourceManager.GetString("Pager_Page", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Go to the previous page.
        /// </summary>
        public static string Pager_Previous
        {
            get { return Messages.ResourceManager.GetString("Pager_Previous", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Refresh.</summary>
        public static string Pager_Refresh
        {
            get { return Messages.ResourceManager.GetString("Pager_Refresh", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Drop Column Fields Here.
        /// </summary>
        public static string PivotConfigurator_Columns
        {
            get { return Messages.ResourceManager.GetString("PivotConfigurator_Columns", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Columns.</summary>
        public static string PivotConfigurator_ColumnsLabel
        {
            get
            {
                return Messages.ResourceManager.GetString("PivotConfigurator_ColumnsLabel", Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Fields.</summary>
        public static string PivotConfigurator_FieldsLabel
        {
            get
            {
                return Messages.ResourceManager.GetString("PivotConfigurator_FieldsLabel", Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Drop Data Fields Here.
        /// </summary>
        public static string PivotConfigurator_Measures
        {
            get { return Messages.ResourceManager.GetString("PivotConfigurator_Measures", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Measures.</summary>
        public static string PivotConfigurator_MeasuresLabel
        {
            get
            {
                return Messages.ResourceManager.GetString("PivotConfigurator_MeasuresLabel", Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Drop Rows Fields Here.
        /// </summary>
        public static string PivotConfigurator_Rows
        {
            get { return Messages.ResourceManager.GetString("PivotConfigurator_Rows", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Rows.</summary>
        public static string PivotConfigurator_RowsLabel
        {
            get { return Messages.ResourceManager.GetString("PivotConfigurator_RowsLabel", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string PivotFieldMenu_Cancel
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Cancel", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Clear.</summary>
        public static string PivotFieldMenu_Clear
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Clear", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Filter.</summary>
        public static string PivotFieldMenu_Filter
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Filter", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Fields Filter.
        /// </summary>
        public static string PivotFieldMenu_FilterFields
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_FilterFields", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Include Fields....
        /// </summary>
        public static string PivotFieldMenu_Include
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Include", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Show items with value that:.
        /// </summary>
        public static string PivotFieldMenu_Info
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Info", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Ok.</summary>
        public static string PivotFieldMenu_Ok
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Ok", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Fields to include.
        /// </summary>
        public static string PivotFieldMenu_Title
        {
            get { return Messages.ResourceManager.GetString("PivotFieldMenu_Title", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to all day.</summary>
        public static string Scheduler_AllDay
        {
            get { return Messages.ResourceManager.GetString("Scheduler_AllDay", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Scheduler_Cancel
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Cancel", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Are you sure you want to delete this event?.
        /// </summary>
        public static string Scheduler_Confirmation
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Confirmation", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Date.</summary>
        public static string Scheduler_Date
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Date", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to All events.</summary>
        public static string Scheduler_DefaultRowText
        {
            get { return Messages.ResourceManager.GetString("Scheduler_DefaultRowText", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Delete event.
        /// </summary>
        public static string Scheduler_DeleteWindowTitle
        {
            get { return Messages.ResourceManager.GetString("Scheduler_DeleteWindowTitle", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Delete.</summary>
        public static string Scheduler_Destroy
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Destroy", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to All day event.
        /// </summary>
        public static string Scheduler_Editor_AllDayEvent
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_AllDayEvent", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Description.</summary>
        public static string Scheduler_Editor_Description
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_Description", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Event.</summary>
        public static string Scheduler_Editor_EditorTitle
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_EditorTitle", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to End.</summary>
        public static string Scheduler_Editor_End
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_End", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to End timezone.
        /// </summary>
        public static string Scheduler_Editor_EndTimezone
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_EndTimezone", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to No timezone.</summary>
        public static string Scheduler_Editor_NoTimezone
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_NoTimezone", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Repeat.</summary>
        public static string Scheduler_Editor_Repeat
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_Repeat", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Use separate start and end time zones.
        /// </summary>
        public static string Scheduler_Editor_SeparateTimezones
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Editor_SeparateTimezones",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Start.</summary>
        public static string Scheduler_Editor_Start
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_Start", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Start timezone.
        /// </summary>
        public static string Scheduler_Editor_StartTimezone
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Editor_StartTimezone", Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  .</summary>
        public static string Scheduler_Editor_Timezone
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_Timezone", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Time zone.</summary>
        public static string Scheduler_Editor_TimezoneEditorButton
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Editor_TimezoneEditorButton",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Timezones.</summary>
        public static string Scheduler_Editor_TimezoneEditorTitle
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Editor_TimezoneEditorTitle",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Title.</summary>
        public static string Scheduler_Editor_Title
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Editor_Title", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Event.</summary>
        public static string Scheduler_Event
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Event", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Do you want to delete only this event occurrence or the whole series?.
        /// </summary>
        public static string Scheduler_Recurrence_DeleteRecurring
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_DeleteRecurring",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Delete current occurrence.
        /// </summary>
        public static string Scheduler_Recurrence_DeleteWindowOccurrence
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_DeleteWindowOccurrence",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Delete the series.
        /// </summary>
        public static string Scheduler_Recurrence_DeleteWindowSeries
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_DeleteWindowSeries",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Delete Recurring Item.
        /// </summary>
        public static string Scheduler_Recurrence_DeleteWindowTitle
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_DeleteWindowTitle",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  days(s).</summary>
        public static string Scheduler_Recurrence_Editor_Daily_Interval
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Daily_Interval",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Repeat every: .
        /// </summary>
        public static string Scheduler_Recurrence_Editor_Daily_RepeatEvery
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Daily_RepeatEvery",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to After .</summary>
        public static string Scheduler_Recurrence_Editor_End_After
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_After",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to End:.</summary>
        public static string Scheduler_Recurrence_Editor_End_Label
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_Label",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Ends.</summary>
        public static string Scheduler_Recurrence_Editor_End_MobileLabel
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_MobileLabel",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Never.</summary>
        public static string Scheduler_Recurrence_Editor_End_Never
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_Never",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to  occurrence(s).
        /// </summary>
        public static string Scheduler_Recurrence_Editor_End_Occurrence
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_Occurrence",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to On .</summary>
        public static string Scheduler_Recurrence_Editor_End_On
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_End_On",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Daily.</summary>
        public static string Scheduler_Recurrence_Editor_Frequencies_Daily
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Frequencies_Daily",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Monthly.</summary>
        public static string Scheduler_Recurrence_Editor_Frequencies_Monthly
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Frequencies_Monthly",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Never.</summary>
        public static string Scheduler_Recurrence_Editor_Frequencies_Never
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Frequencies_Never",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Weekly.</summary>
        public static string Scheduler_Recurrence_Editor_Frequencies_Weekly
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Frequencies_Weekly",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Yearly.</summary>
        public static string Scheduler_Recurrence_Editor_Frequencies_Yearly
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Frequencies_Yearly",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Day .</summary>
        public static string Scheduler_Recurrence_Editor_Monthly_Day
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Monthly_Day",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  month(s).</summary>
        public static string Scheduler_Recurrence_Editor_Monthly_Interval
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Monthly_Interval",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Repeat every: .
        /// </summary>
        public static string Scheduler_Recurrence_Editor_Monthly_RepeatEvery
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Monthly_RepeatEvery",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Repeat on: .</summary>
        public static string Scheduler_Recurrence_Editor_Monthly_RepeatOn
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Monthly_RepeatOn",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to first.</summary>
        public static string Scheduler_Recurrence_Editor_OffsetPositions_First
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_OffsetPositions_First",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to fourth.</summary>
        public static string Scheduler_Recurrence_Editor_OffsetPositions_Fourth
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_OffsetPositions_Fourth",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to last.</summary>
        public static string Scheduler_Recurrence_Editor_OffsetPositions_Last
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_OffsetPositions_Last",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to second.</summary>
        public static string Scheduler_Recurrence_Editor_OffsetPositions_Second
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_OffsetPositions_Second",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to third.</summary>
        public static string Scheduler_Recurrence_Editor_OffsetPositions_Third
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_OffsetPositions_Third",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to day.</summary>
        public static string Scheduler_Recurrence_Editor_Weekdays_Day
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekdays_Day",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to weekday.</summary>
        public static string Scheduler_Recurrence_Editor_Weekdays_Weekday
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekdays_Weekday",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to weekend day.</summary>
        public static string Scheduler_Recurrence_Editor_Weekdays_Weekend
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekdays_Weekend",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  week(s).</summary>
        public static string Scheduler_Recurrence_Editor_Weekly_Interval
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekly_Interval",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Repeat every: .
        /// </summary>
        public static string Scheduler_Recurrence_Editor_Weekly_RepeatEvery
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekly_RepeatEvery",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Repeat on: .</summary>
        public static string Scheduler_Recurrence_Editor_Weekly_RepeatOn
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Weekly_RepeatOn",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  year(s).</summary>
        public static string Scheduler_Recurrence_Editor_Yearly_Interval
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Yearly_Interval",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to  of .</summary>
        public static string Scheduler_Recurrence_Editor_Yearly_Of
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Yearly_Of",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Repeat every: .
        /// </summary>
        public static string Scheduler_Recurrence_Editor_Yearly_RepeatEvery
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Yearly_RepeatEvery",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Repeat on: .</summary>
        public static string Scheduler_Recurrence_Editor_Yearly_RepeatOn
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_Editor_Yearly_RepeatOn",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Do you want to edit only this event occurrence or the whole series?.
        /// </summary>
        public static string Scheduler_Recurrence_EditRecurring
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_EditRecurring",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Edit current occurrence.
        /// </summary>
        public static string Scheduler_Recurrence_EditWindowOccurrence
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_EditWindowOccurrence",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Edit the series.
        /// </summary>
        public static string Scheduler_Recurrence_EditWindowSeries
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_EditWindowSeries",
                    Messages.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Edit Recurring Item.
        /// </summary>
        public static string Scheduler_Recurrence_EditWindowTitle
        {
            get
            {
                return Messages.ResourceManager.GetString("Scheduler_Recurrence_EditWindowTitle",
                    Messages.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to Save.</summary>
        public static string Scheduler_Save
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Save", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Show full day.
        /// </summary>
        public static string Scheduler_ShowFullDay
        {
            get { return Messages.ResourceManager.GetString("Scheduler_ShowFullDay", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Show business hours.
        /// </summary>
        public static string Scheduler_ShowWorkDay
        {
            get { return Messages.ResourceManager.GetString("Scheduler_ShowWorkDay", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Time.</summary>
        public static string Scheduler_Time
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Time", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Today.</summary>
        public static string Scheduler_Today
        {
            get { return Messages.ResourceManager.GetString("Scheduler_Today", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Agenda.</summary>
        public static string Scheduler_View_Agenda
        {
            get { return Messages.ResourceManager.GetString("Scheduler_View_Agenda", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Day.</summary>
        public static string Scheduler_View_Day
        {
            get { return Messages.ResourceManager.GetString("Scheduler_View_Day", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Month.</summary>
        public static string Scheduler_View_Month
        {
            get { return Messages.ResourceManager.GetString("Scheduler_View_Month", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Week.</summary>
        public static string Scheduler_View_Week
        {
            get { return Messages.ResourceManager.GetString("Scheduler_View_Week", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Work Week.</summary>
        public static string Scheduler_View_WorkWeek
        {
            get { return Messages.ResourceManager.GetString("Scheduler_View_WorkWeek", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Cancel.</summary>
        public static string Upload_Cancel
        {
            get { return Messages.ResourceManager.GetString("Upload_Cancel", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to drop files here to upload.
        /// </summary>
        public static string Upload_DropFilesHere
        {
            get { return Messages.ResourceManager.GetString("Upload_DropFilesHere", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Done.</summary>
        public static string Upload_HeaderStatusUploaded
        {
            get { return Messages.ResourceManager.GetString("Upload_HeaderStatusUploaded", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Uploading....
        /// </summary>
        public static string Upload_HeaderStatusUploading
        {
            get { return Messages.ResourceManager.GetString("Upload_HeaderStatusUploading", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Remove.</summary>
        public static string Upload_Remove
        {
            get { return Messages.ResourceManager.GetString("Upload_Remove", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Retry.</summary>
        public static string Upload_Retry
        {
            get { return Messages.ResourceManager.GetString("Upload_Retry", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to Select....</summary>
        public static string Upload_Select
        {
            get { return Messages.ResourceManager.GetString("Upload_Select", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to failed.</summary>
        public static string Upload_StatusFailed
        {
            get { return Messages.ResourceManager.GetString("Upload_StatusFailed", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to uploaded.</summary>
        public static string Upload_StatusUploaded
        {
            get { return Messages.ResourceManager.GetString("Upload_StatusUploaded", Messages.resourceCulture); }
        }

        /// <summary>Looks up a localized string similar to uploading.</summary>
        public static string Upload_StatusUploading
        {
            get { return Messages.ResourceManager.GetString("Upload_StatusUploading", Messages.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Upload files.
        /// </summary>
        public static string Upload_UploadSelectedFiles
        {
            get { return Messages.ResourceManager.GetString("Upload_UploadSelectedFiles", Messages.resourceCulture); }
        }

        internal Messages()
        {
        }
    }
}
