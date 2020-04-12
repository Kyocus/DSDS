using System;
using System.Collections.Generic;
using System.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Core.Classes
{
    class IdCertificate
    {

        public IdCertificate()
        {
        }

        public IdCertificate(byte[] bytes)
        {
            Certificate = new X509Certificate(bytes);
        }

        public IdCertificate(byte[] bytes, SecureString password)
        {
            Certificate = new X509Certificate(bytes, password);
        }

        public IdCertificate(byte[] bytes, string password)
        {
            Certificate = new X509Certificate(bytes, password);
        }

        public IdCertificate(string path)
        {
            Certificate = new X509Certificate(path);
        }

        public IdCertificate(string path, SecureString password)
        {
            Certificate = new X509Certificate(path, password);
        }



        private X509Certificate certificate;

        public X509Certificate Certificate { get => certificate; set => certificate = value; }
    }
}
