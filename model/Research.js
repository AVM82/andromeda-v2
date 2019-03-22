modele.exports = class Research {

    constructor(_id, name, orgId, initDate, lastPatientDate, contact, note, active) {
        this._id = _id;
        this.name = name;
        this.orgId = orgId;
        this.initDate = initDate;
        this.lastPatientDate = lastPatientDate;
        this.contact = contact;
        this.note = note;
        this.active = active;
    }

};
