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

            //services.AddScoped<IRepository<Attachment>>();
            //services.AddScoped<IRepository<Comment>>();
            //services.AddScoped<IRepository<Decision>>();
            //services.AddScoped<IRepository<Group>>();
            //services.AddScoped<IRepository<Status>>();
            //services.AddScoped<IRepository<Vote>>();
            //services.AddScoped<IRepository<Voter>>();

            services.AddScoped<Attachment>();
            services.AddScoped<Comment>();
            services.AddScoped<Decision>();
            services.AddScoped<Group>();
            services.AddScoped<GroupOfGroups>();
            services.AddScoped<GroupOfVoters>();
            services.AddScoped<Status>();
            services.AddScoped<Vote>();
            services.AddScoped<Voter>();

            services.AddScoped<IDomain<Attachment>, AttachmentDomain>();
            services.AddScoped<IDomain<Comment>, CommentDomain>();
            services.AddScoped<IDomain<Decision>, DecisionDomain>();
            services.AddScoped<IDomain<Group>, GroupDomain>();
            services.AddScoped<IDomain<Status>, StatusDomain>();
            services.AddScoped<IDomain<Vote>, VoteDomain>();
            services.AddScoped<IDomain<Voter>, VoterDomain>();


            services.AddDbContext<DataContext>(opt =>
            opt.UseInMemoryDatabase("EntityList"));

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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

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
