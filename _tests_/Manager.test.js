const Manager = require("../lib/manager");


describe("manager class tests for all methods", () => {
    const manager = new Manager('Empl O. Yee', '01', '123-456-7890', 'employee@email.com')
    it("Should return name", () => {
        expect(manager.getName()).toBe('Empl O. Yee')
    })
    it("Should return ID", () => {
        expect(manager.getId()).toBe('01')
    })
    it("Should return office number", () => {
        expect(manager.getOfficeNum()).toBe('123-456-7890')
    })
    it("Should return email", () => {
        expect(manager.getEmail()).toBe('employee@email.com')
    })
})