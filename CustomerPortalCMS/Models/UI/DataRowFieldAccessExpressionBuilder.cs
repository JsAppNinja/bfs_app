using System;
using System.Data;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal class DataRowFieldAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        private static readonly MethodInfo DataRowFieldMethod = typeof(DataRowExtensions).GetMethod("Field", new Type[2]
        {
            typeof(DataRow),
            typeof(string)
        });

        private readonly Type columnDataType;

        public Type ColumnDataType
        {
            get { return this.columnDataType; }
        }

        public DataRowFieldAccessExpressionBuilder(Type memberType, string memberName)
            : base(typeof(DataRow), memberName)
        {
            if (memberType.IsValueType && !memberType.IsNullableType())
                this.columnDataType = typeof(Nullable<>).MakeGenericType(memberType);
            else
                this.columnDataType = memberType;
        }

        public override Expression CreateMemberAccessExpression()
        {
            ConstantExpression constantExpression = Expression.Constant((object) this.MemberName);
            return (Expression) Expression.Call(
                DataRowFieldAccessExpressionBuilder.DataRowFieldMethod.MakeGenericMethod(this.columnDataType),
                (Expression) this.ParameterExpression, (Expression) constantExpression);
        }
    }
}
