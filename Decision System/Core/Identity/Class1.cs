using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Text.Encodings.Web;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using KDT.EntityFramework.LinqExpander;
using DRT.Core.Models;
namespace Core.Identity
{
    public class DrtAuthenticationHandler :
AuthenticationHandler<DrtAuthenticationOptions>
    {
        private DRTEntities Database { get; set; }
        public
DrtAuthenticationHandler(IOptionsMonitor<DrtAuthenticationOptions> options,
ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, DRTEntities
context) : base(options, logger, encoder, clock)
        {
            Database = context;
        }
        protected override Task<AuthenticateResult>
HandleAuthenticateAsync()
        {
            var edipi = Context.User.Claims.Where(c => c.Type ==
"edipi").FirstOrDefault()?.Value;
            var user = Database.User.AsExpandable().Where(u =>
u.Edipi == edipi).FirstOrDefault();
            if (user == null)
            {
                return
Task.FromResult(AuthenticateResult.Fail("No user found for edipi."));
            }
            var principal = new DrtPrincipal(user);
            var ticket = new AuthenticationTicket(principal,
DrtAuthenticationDefaults.AuthenticationScheme);
            return
Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
