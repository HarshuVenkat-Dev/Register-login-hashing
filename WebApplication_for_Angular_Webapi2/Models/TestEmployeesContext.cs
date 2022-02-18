using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebApplication_for_Angular_Webapi2.Models
{
    public partial class TestEmployeesContext : DbContext
    {
        public TestEmployeesContext()
        {
        }

        public TestEmployeesContext(DbContextOptions<TestEmployeesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<LoginDetail> LoginDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=ATMECSINLT-684\\MSSQLSERVERNEW;Initial Catalog=TestEmployees;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmpId);

                entity.ToTable("Employee");

                entity.Property(e => e.EmpId).ValueGeneratedNever();

                entity.Property(e => e.EmpCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.EmpName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LoginDetail>(entity =>
            {
                entity.HasKey(e =>e.EmailId);

                entity.ToTable("LoginDetails");

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Token).HasMaxLength(250);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
