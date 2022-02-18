using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WebApplication_for_Angular_Webapi2.Models;

namespace WebApplication_for_Angular_Webapi2.Controllers
{
    [ApiController]
    [Route("{controller}/{action}")]

    public class EmployeeController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            using (var context = new TestEmployeesContext())
            {
                var result = (from row in context.Employees select row).ToList();
               // select sd;
                return (IEnumerable<Employee>)result;
            }
        }

        [HttpGet("{id}")]
        public Employee GetByid(int id)
        {
            using (var context = new TestEmployeesContext())
            {
                var stuData = context.Employees.Find(id);

                return stuData;
            }
        }

        // POST api/values
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] Employee value)
        {
            using (var context = new TestEmployeesContext())
            {
                try
                {

                    if (ModelState.IsValid)
                    {
                        context.Employees.Add(value);
                        context.SaveChanges();
                        return Ok("Employee Added Status Code: 201");
                    }
                    else
                    {
                        return BadRequest("Bad Request Status Code: 404");
                    }
                }
                catch (Exception ex)
                {
                    return NotFound("Bad Request Status Code: 404" + ex);
                }
            }
        }

        /*[HttpPut("{Id}")]
        // PUT api/values/5
        public IActionResult Put([FromBody] Employee value, int Id)
        {

            using (var context = new TestEmployeesContext())
            {
                if (ModelState.IsValid)
                {
                    db.Entry(value).State = EntityState.Modified;
                    db.SaveChanges();
                    var validstudents = from c in context.Employees
                                        where c.EmpId == Id
                                        select c;
                    if (validstudents != null)
                    {
                        foreach (Employee stud in validstudents)
                        {
                            stud.EmpId = value.EmpId;
                            stud.EmpName = value.EmpName;
                            stud.EmpCity = value.EmpCity;
                        }
                        context.SaveChanges();
                        return Ok("Employee Updated Status Code: 200");
                    }

                }
                return BadRequest("Employee Updated Error Status Code: 404");

            }

        }
*/


        // DELETE api/values/5
        [HttpDelete("{id}")]

        public string Delete(int id)
        {
            using (var context = new TestEmployeesContext())
            {
                try
                {
                    var studentData = context.Employees.Find(id);
                    context.Employees.Remove(studentData);
                    context.SaveChanges();
                    return "Employee Detail Delete";
                }
                catch
                {
                    return "Invalid Model";
                }
            }
        }

        public IActionResult PostRegister([FromBody] LoginDetail value)
        {
            using (var context = new TestEmployeesContext())
            {
                try
                {
                    if (ModelState.IsValid)
                    {
                        context.LoginDetails.Add(value);
                        context.SaveChanges();
                        return Ok("New Employee Created Status Code: 201");
                    }
                    else
                    {
                        return BadRequest("Bad Request Status Code: 404");
                    }
                }
                catch (Exception ex)
                {
                    return NotFound("Bad Request Status Code: 404" + ex);
                }
            }
        }

        [HttpGet("{email}")]
        public LoginDetail GetByemail(string email)
        {
            using (var context = new TestEmployeesContext())
            {
                var stuData = context.LoginDetails.Find(email);

                return stuData;
            }
        }
    }
}
