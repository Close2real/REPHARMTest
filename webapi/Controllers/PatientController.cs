using database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientController : ControllerBase
{
    private readonly RefarmDBContext _refarmDBContext;

    public PatientController(RefarmDBContext refarmDBContext)
    {
        _refarmDBContext = refarmDBContext;
    }

    [HttpGet(Name = "GetPatients")]
    public ICollection<Patient> Get()
    {
        return _refarmDBContext.Patients.ToList();
    }
}
