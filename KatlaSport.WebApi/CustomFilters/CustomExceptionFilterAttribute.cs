using KatlaSport.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace KatlaSport.WebApi.CustomFilters
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            // TODO Add logging here.
            if (context.Exception is RequestedResourceNotFoundException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            else if (context.Exception is RequestedResourceHasConflictException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.Conflict);
            }
            else if (context.Exception is Exception)
            {
                //_logger.LogError($"Database error in CreateHiveSectionAsync: {context.Exception.InnerException?.Message}");
                //context.Exception.InnerException?.Message
               context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                context.Response.Content = new StringContent(context.Exception.InnerException?.Message ?? context.Exception.Message);
                //context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}
