const Employee = require("./employee")

class Manager extends Employee {
    constructor (name, id, officeNum, email){
        super (name, id, email)
        this.officeNum = officeNum
        this.title = "Manager"
    }
    getRole(){
        return this.title;
    }
    getOfficeNum(){
        return this.officeNum;
    }
}

module.exports = Manager