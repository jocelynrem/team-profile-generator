const Employee = require("../lib/Employee")

describe("Employee Class tests for all methods", () => {
    const employee = new Employee('Empl O. Yee', 01, 'employee@email.com')
    it("Should return name", () => {
        expect(employee.getName()).toBe('Empl O. Yee')
    })
    it("Should return ID", () => {
        expect(employee.getId()).toBe(01)
    })
    it("Should return email", () => {
        expect(employee.getEmail()).toBe('employee@email.com')
    })
})