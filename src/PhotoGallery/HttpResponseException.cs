using System;

namespace PhotoGallery.Controllers
{
    internal class HttpResponseException : Exception
    {
        private object unsupportedMediaType;

        public HttpResponseException()
        {
        }

        public HttpResponseException(string message) : base(message)
        {
        }

        public HttpResponseException(object unsupportedMediaType)
        {
            this.unsupportedMediaType = unsupportedMediaType;
        }

        public HttpResponseException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}