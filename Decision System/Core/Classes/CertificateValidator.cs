using System;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Threading.Tasks;

namespace Core.Classes
{
    public class CertificateValidation
    {
        public bool ValidateCertificate(X509Certificate2 clientCertificate)
        {
            // Do not hardcode passwords in production code
            // Use thumbprint or key vault
            var cert = new X509Certificate2(
                Path.Combine("sts_dev_cert.pfx"), "1234");

            if (clientCertificate.Thumbprint == cert.Thumbprint)
            {
                return true;
            }

            return false;
        }


        //private readonly IHttpClientFactory _clientFactory;

        //public ApiService(IHttpClientFactory clientFactory)
        //{
        //    _clientFactory = clientFactory;
        //}

        //private async Task<JsonDocument> GetApiDataWithNamedClient()
        //{
        //    var client = _clientFactory.CreateClient("namedClient");

        //    var request = new HttpRequestMessage()
        //    {
        //        RequestUri = new Uri("https://localhost:44379/api/values"),
        //        Method = HttpMethod.Get,
        //    };
        //    var response = await client.SendAsync(request);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var responseContent = await response.Content.ReadAsStringAsync();
        //        var data = JsonDocument.Parse(responseContent);
        //        return data;
        //    }

        //    throw new ApplicationException($"Status code: {response.StatusCode}, Error: {response.ReasonPhrase}");
        //}

        //private async Task<JsonDocument> GetApiDataUsingHttpClientHandler()
        //{
        //    var cert = new X509Certificate2(Path.Combine(_environment.ContentRootPath, "sts_dev_cert.pfx"), "1234");
        //    var handler = new HttpClientHandler();
        //    handler.ClientCertificates.Add(cert);
        //    var client = new HttpClient(handler);

        //    var request = new HttpRequestMessage()
        //    {
        //        RequestUri = new Uri("https://localhost:44379/api/values"),
        //        Method = HttpMethod.Get,
        //    };
        //    var response = await client.SendAsync(request);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var responseContent = await response.Content.ReadAsStringAsync();
        //        var data = JsonDocument.Parse(responseContent);
        //        return data;
        //    }

        //    throw new ApplicationException($"Status code: {response.StatusCode}, Error: {response.ReasonPhrase}");
        //}
    }
}