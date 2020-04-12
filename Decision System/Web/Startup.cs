using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using DecisionSystem.Repository;
using Core.Models;
using Core.Domains;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace DecisionSystem
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddScoped<DbContext, DataContext>();
            services.AddScoped<IRepository<Attachment>, AttachmentRepository>();
            services.AddScoped<IRepository<Comment>, CommentRepository>();
            services.AddScoped<IRepository<Decision>, DecisionRepository>();
            services.AddScoped<IRepository<Group>, GroupRepository>();
            services.AddScoped<IRepository<Status>, StatusRepository>();
            services.AddScoped<IRepository<Vote>, VoteRepository>();
            services.AddScoped<IRepository<Voter>, VoterRepository>();
            services.AddScoped<IRepository<User>, UserRepository>();

            services.AddScoped<AuthenticationHandler>();
            services.AddScoped<Attachment>();
            services.AddScoped<Comment>();
            services.AddScoped<Decision>();
            services.AddScoped<Group>();
            services.AddScoped<GroupGroup>();
            services.AddScoped<GroupVoter>();
            services.AddScoped<Status>();
            services.AddScoped<Vote>();
            services.AddScoped<Voter>();
            services.AddScoped<User>();

            services.AddScoped<IDomain<Attachment, AttachmentDto>, AttachmentDomain>();
            services.AddScoped<IDomain<Comment, CommentDto>, CommentDomain>();
            services.AddScoped<IDomain<Decision, DecisionDto>, DecisionDomain>();
            services.AddScoped<IDomain<Group, GroupDto>, GroupDomain>();
            services.AddScoped<IDomain<Status, StatusDto>, StatusDomain>();
            services.AddScoped<IDomain<Vote, VoteDto>, VoteDomain>();
            services.AddScoped<IDomain<Voter, VoterDto>, VoterDomain>();
            services.AddScoped<IDomain<User, UserDto>, UserDomain>();

            services.AddCors();

            services.AddDbContext<DataContext>(opt =>
            opt.UseInMemoryDatabase("EntityList"));

            services.AddCertificateForwarding(options =>
            {
                options.CertificateHeader = "X-SSL-CERT";
                options.HeaderConverter = (headerValue) =>
                {
                    X509Certificate2 clientCertificate = null;

                    if (!string.IsNullOrWhiteSpace(headerValue))
                    {
                        byte[] bytes = StringToByteArray(headerValue);
                        clientCertificate = new X509Certificate2(bytes);
                    }

                    return clientCertificate;
                };
            });


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = $"https://{Configuration["Auth0:Domain"]}/";
                options.Audience = Configuration["Auth0:Audience"];
            });

            services.AddMvc();
            services.AddRazorPages()
                .AddRazorPagesOptions(options =>
                {
                    options.Conventions.AddPageRoute("/App", "App");
                });

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });


        }

        private static byte[] StringToByteArray(string hex)
        {
            int NumberChars = hex.Length;
            byte[] bytes = new byte[NumberChars / 2];

            for (int i = 0; i < NumberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }

            return bytes;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCertificateForwarding();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            //DefaultFilesOptions DefaultFile = new DefaultFilesOptions();
            //DefaultFile.DefaultFileNames.Clear();
            //DefaultFile.DefaultFileNames.Add("/Pages/Index.html");
            //app.UseDefaultFiles(DefaultFile);
            app.UseStaticFiles();

            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new List<string> { "index.html" }
            });

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
