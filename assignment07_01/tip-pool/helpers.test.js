describe("helpers tests", () => {
  describe("calculateTipPercent()", () => {
    it("should calculate the tip percentage", function() {
      expect(calculateTipPercent(100, 25)).toEqual(25)
    })
  })

  describe("sumPaymentTotal()", () => {
    billAmtInput.value = 100
    tipAmtInput.value = 20
    submitPaymentInfo()

    billAmtInput.value = 200
    tipAmtInput.value = 30
    submitPaymentInfo()

    it("should sum total amount of tips", () => {
      expect(sumPaymentTotal('tipAmt')).toEqual(50)
    })

    it("should sum total amount of bills", () => {
      expect(sumPaymentTotal('billAmt')).toEqual(300)
    })

    it("should sum total amount of tip percentage", () => {
      expect(sumPaymentTotal('tipPercent')).toEqual(35)
    })
  })
})