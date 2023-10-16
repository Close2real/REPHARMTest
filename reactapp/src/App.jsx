import { Component } from 'react';
import "./App.css";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { patients: [], doctors: [], loading: true, page: 'patients', doctorPatients: [], patientName: '', currentDoctor: 0 };
    }

    renderDoctorsTable(doctors) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Patients</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor =>
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td><a href="#" onClick={() => this.handleGoToLink('doctor-patients', doctor.id)}>Patients</a></td>
                            <td><a href="#" onClick={() => this.handleGoToLink('add-patient', doctor.id)}>Add patient</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderDoctorPatientsTable(doctorPatients) {
        console.log(doctorPatients);
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorPatients.map(patient =>
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderPatientsTable(patients) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient =>
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleChange(value) {
        this.setState({ patientName: value });
    }

    renderAddPatient() {
        return (
            <div>
                <input value={this.state.patientName} onChange={(e) => this.handleChange(e.target.value)} />
                <button onClick={() => this.sendData(this.state.currentDoctor)}>Submit</button>
            </div>
        )
    }

    async sendData(doctorId) {
        await fetch('doctor/' + doctorId + '/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.patientName
            })
        }).then((response) => {
            if (response.status === 201) {
                alert('User ' + this.state.patientName + ' created');
            } else {
                alert('Oops, something went wrong');
            }
        });

        this.setState({ patientName: '' });
    }

    handleGoToLink(page, id = 0) {
        switch (page) {
            case 'patients':
                this.populatePatientData();
                break;
            case 'doctors':
                this.populateDoctorData();
                break;
            case 'doctor-patients':
                this.populateDoctorPatientsData(id);
                break;
            case 'add-patient':
                this.setState({ page: 'add-patient', currentDoctor: id });
                break;
        }
    }

    renderSwitch(param) {
        switch (param) {
            case 'patients':
                return this.renderPatientsTable(this.state.patients);
            case 'doctors':
                return this.renderDoctorsTable(this.state.doctors);
            case 'doctor-patients':
                return this.renderDoctorPatientsTable(this.state.doctorPatients);
            case 'add-patient':
                return this.renderAddPatient();
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... </em></p>
            : this.renderSwitch(this.state.page);

        return (
            <div className="main_block">
                <a className="main_link" href="#" onClick={() => this.handleGoToLink('patients')}>Patients</a>
                <a className="main_link" href="#" onClick={() => this.handleGoToLink('doctors')}>Doctors</a>
                {contents}
            </div>
        );
    }

    async populatePatientData() {
        this.setState({ loading: true });
        const response = await fetch('patient');
        const data = await response.json();
        this.setState({ patients: data, loading: false, page: 'patients' });
    }

    async populateDoctorData() {
        this.setState({ loading: true });
        const response = await fetch('doctor');
        const data = await response.json();
        this.setState({ doctors: data, loading: false, page: 'doctors' });
    }

    async populateDoctorPatientsData(id) {
        this.setState({ loading: true });
        const response = await fetch('doctor/'+id+'/patient');
        const data = await response.json();
        this.setState({ doctorPatients: data, loading: false, page: 'doctor-patients' });
    }
}
