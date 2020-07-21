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
using Core.Models;
using DecisionSystem.Data;

namespace Core.Identity
{
    public class AuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private DataContext Database { get; set; }
        
        public AuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, DataContext context) : base(options, logger, encoder, clock)
        {
            Database = context;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var id = Context.User.Claims.Where(c => c.Type == "id").FirstOrDefault()?.Value;
            var user = Database.Voters.Where(u => u.Id == Convert.ToInt32(id)).FirstOrDefault();
            
            if (user == null)
            {
                return Task.FromResult(AuthenticateResult.Fail("No user found for id."));
            }
            
            var principal = new Principal(user);
            var ticket = new AuthenticationTicket(principal, "Authentication");
            
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
