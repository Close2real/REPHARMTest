using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace database
{
    public class RefarmDBContext: DbContext
    {
        protected readonly IConfiguration Configuration;

        public RefarmDBContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sqlite database
            options.UseSqlite(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
    }
}