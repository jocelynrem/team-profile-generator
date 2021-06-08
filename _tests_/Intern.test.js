const Intern = require("./lib/Intern");


describe("Intern class tests for all methods", () => {
    const intern = new Intern('Empl O. Yee', 01, 'school name', 'employee@email.com')
    it("Should return name", () => {
        expect(intern.getName()).toBe('Empl O. Yee')
    })
    it("Should return ID", () => {
        expect(intern.getId()).toBe(01)
    })
    it("Should return school", () => {
        expect(intern.School()).toBe('school name')
    })
    it("Should return email", () => {
        expect(intern.getEmail()).toBe('employee@email.com')
    })
})