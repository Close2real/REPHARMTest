using database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class DoctorController : ControllerBase
{
    private readonly RefarmDBContext _refarmDBContext;

    public DoctorController(RefarmDBContext refarmDBContext)
    {
        _refarmDBContext = refarmDBContext;
    }

    [HttpGet]
    public ICollection<Doctor> Get()
    {
        return _refarmDBContext.Doctors.Include(D => D.Patients).ToList();
    }

    [HttpGet("{id:int}")]
    public Doctor Get(int id)
    {
        return _refarmDBContext.Doctors.Single(D => D.Id == id);
    }

    [HttpGet("{id:int}/Patient")]
    public ActionResult<ICollection<Patient>> GetPatients(int id)
    {
        if (_refarmDBContext.Doctors.Find(id) == null)
        {
            return NotFound();
        }

        return Ok(_refarmDBContext.Doctors.Include(D => D.Patients).Single(D => D.Id == id).Patients.ToList());
    }

    [HttpPut]
    public ActionResult<Doctor> Put(Doctor doctor)
    {
        if (_refarmDBContext.Doctors.Contains(doctor))
        {
            _refarmDBContext.Entry(doctor).State = EntityState.Modified;
        } else
        {
            _refarmDBContext.Doctors.Add(doctor);
        }
        
        _refarmDBContext.SaveChanges();

        return CreatedAtAction("Put", doctor);
    }

    [HttpPost("{id:int}/Patient")]
    public ActionResult<Patient> PostPatient(int id, Patient patient)
    {
        if (_refarmDBContext.Doctors.Find(id) == null)
        {
            return NotFound();
        }

        var doctor = _refarmDBContext.Doctors.Include(D => D.Patients).Single(D => D.Id == id);

        doctor.Patients.Add(patient);

        _refarmDBContext.SaveChanges();

        return CreatedAtAction("PostPatient", patient);
    }
}
