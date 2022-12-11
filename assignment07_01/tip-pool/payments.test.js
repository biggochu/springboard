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
      billAmtInput.value = ''
      tipAmtInput.value = ''
      allPayments = {}
      paymentTbody.innerHTML = ''
      updateSummary()
    })
  })

  describe("submitPaymentInfo()", () => {
    beforeEach(() => {
      billAmtInput.value = 100
      tipAmtInput.value = 20
      paymentId = 0
      allPayments = {}
    })

    it('should increment paymentId if curPayment is valid', () => {
      submitPaymentInfo()
      expect(paymentId).toEqual(1)
    })

    it('should set the curPayment object in allPayments', () => {
      submitPaymentInfo()
      expect(allPayments['payment' + paymentId]).toEqual({
        billAmt: '100',
        tipAmt: '20',
        tipPercent: 20
      })
    })

    afterEach(() => {
      billAmtInput.value = ''
      tipAmtInput.value = ''
    })
  })

  describe("appendPaymentTable()", () => {
    let curPayment = {
      billAmt: '100',
      tipAmt: '20',
      tipPercent: 20
    }

    beforeEach(() => {
      paymentTbody.innerHTML = ''
    })

    it('should append a new payment row to payments table', () => {
      appendPaymentTable(curPayment)

      const $tr = paymentTbody.children[0]

      expect($tr.tagName).toEqual('TR')
      expect($tr.children.length).toEqual(3)
      expect($tr.children[0].innerText).toEqual('$100')
      expect($tr.children[1].innerText).toEqual('$20')
      expect($tr.children[2].innerText).toEqual('20%')
    })

    afterEach(() => {
      paymentTbody.innerHTML = ''
    })
  })

  describe("updateSummary()", () => {
    beforeEach(() => {
      paymentId = 0
      allPayments = {}
    })

    it('should update the summary table cells', () => {
      billAmtInput.value = 100
      tipAmtInput.value = 20
      submitPaymentInfo()

      billAmtInput.value = 120
      tipAmtInput.value = 5
      submitPaymentInfo()

      updateSummary()

      expect(summaryTds[0].innerText).toEqual('$220')
      expect(summaryTds[1].innerText).toEqual('$25')
      expect(summaryTds[2].innerText).toEqual('12%')
    })

    afterEach(() => {
      billAmtInput.value = ''
      tipAmtInput.value = ''
    })
  })
})