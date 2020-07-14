using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Security.Claims;
using System;

namespace Core.Identity
{
    public class DrtPrincipal : ClaimsPrincipal
    {
        public DrtPrincipal(User user)
        {
            if (user == null)
            {
                return;
            }

            var identity = new ClaimsIdentity("DRT");
            identity.AddClaim(new Claim(ClaimTypes.Name, user.Edipi, ClaimValueTypes.String));
            identity.AddClaim(new Claim(ClaimTypes.Email, user.Email, ClaimValueTypes.Email));
            identity.AddClaim(new Claim("DRT-UserId", user.Id.ToString(), ClaimValueTypes.Integer, "DRT"));

            foreach (var role in user.UserRoles)
            {
                //Commented below line because we are not currently using user roles for the project. 
                //identity.AddClaim(new Claim(ClaimTypes.Role, role.Title, ClaimValueTypes.String));
                //We are also adding the role as a Json claim so we can verify roles for their command as well.
                identity.AddClaim(new JsonClaim<Role>(role.Role));
            }

            this.AddIdentity(identity);
        }

        public static implicit operator DrtPrincipal(User user)
        {
            return new DrtPrincipal(user);
        }
    }
}
