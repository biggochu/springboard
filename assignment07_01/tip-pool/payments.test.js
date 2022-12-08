describe("payments tests", () => {
  describe("createCurPayment()", () => {
    it("should return undefined when bill amount is an empty string", () => {
      billAmtInput.value = ''
      tipAmtInput.value = 0

      expect(createCurPayment()).toBeUndefined()
    })

    it("should return undefined when tip amount is an empty string", () => {
      billAmtInput.value = 1
      tipAmtInput.value = ''

      expect(createCurPayment()).toBeUndefined()
    })

    it("should return undefined when bill amount is 0", () => {
      billAmtInput.value = 0
      tipAmtInput.value = 0

      expect(createCurPayment()).toBeUndefined()
    })

    it("should return undefined when bill amount is less than 0", () => {
      billAmtInput.value = -10
      tipAmtInput.value = 0

      expect(createCurPayment()).toBeUndefined()
    })

    it("should return undefined when tip amount is less than 0", () => {
      billAmtInput.value = 10
      tipAmtInput.value = -10

      expect(createCurPayment()).toBeUndefined()
    })

    it("should return valid values", () => {
      billAmtInput.value = 100
      tipAmtInput.value = 20

      expect(createCurPayment()).toEqual({ billAmt: '100', tipAmt: '20', tipPercent: 20 })
    })

    afterAll(() => {
      allPayments = {}
      paymentTbody.innerHTML = ''
      updateSummary()
    })
  })
})