const Engineer = require("../lib/Engineer");

describe("Engineer class tests for all methods", () => {
    const engineer = new Engineer('Empl O. Yee', '01', 'username', 'employee@email.com')
    it("Should return name", () => {
        expect(engineer.getName()).toBe('Empl O. Yee')
    })
    it("Should return ID", () => {
        expect(engineer.getId()).toBe('01')
    })
    it("Should return GitHub username", () => {
        expect(engineer.getGithub()).toBe('username')
    })
    it("Should return email", () => {
        expect(engineer.getEmail()).toBe('employee@email.com')
    })
})