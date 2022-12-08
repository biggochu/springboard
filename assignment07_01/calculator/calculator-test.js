describe("calculateMonthlyPayment()", function() {
  it('should calculate the monthly rate correctly', function() {
    expect(calculateMonthlyPayment({ principle: 1000, years: 5, rate: 1 })).toBe("17.09")
  });


  it("should return a result with 2 decimal places", function() {
    expect(calculateMonthlyPayment({ principle: 1000, years: 5, rate: 1 })).toMatch(/\d+\.\d\d/)
  });
})

/// etc