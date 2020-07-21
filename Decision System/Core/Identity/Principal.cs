using System.Security.Claims;
using Core.Models;

namespace Core.Identity
{
    public class Principal : ClaimsPrincipal
    {
        public Principal(Voter user)
        {
            if (user == null)
            {
                return;
            }

            var identity = new ClaimsIdentity("");
            identity.AddClaim(new Claim("UserId", user.Id.ToString(), ClaimValueTypes.Integer, ""));
            
            //identity.AddClaim(new Claim(ClaimTypes.Name, user.Id, ClaimValueTypes.String));
            //identity.AddClaim(new Claim(ClaimTypes.Email, user./*Email*/, ClaimValueTypes.Email));

            //foreach (var role in user)
            //{
            //    //Commented below line because we are not currently using user roles for the project. 
            //    //identity.AddClaim(new Claim(ClaimTypes.Role, role.Title, ClaimValueTypes.String));
            //    //We are also adding the role as a Json claim so we can verify roles for their command as well.
            //    identity.AddClaim(new JsonClaim<Role>(role.Role));
            //}

            this.AddIdentity(identity);
        }

        public static implicit operator Principal(Voter user)
        {
            return new Principal(user);
        }
    }
}
