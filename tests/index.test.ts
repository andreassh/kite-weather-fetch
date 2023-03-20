import {jest} from "@jest/globals";

const jobExample:any = {
  id: "someId",
};

// Keeping these examples for mockModule setup
/* jest.unstable_mockModule("../src/client", () => ({
  updateOrder: jest.fn(():OrderEntity => {
    return {
      id: "1",
      attributes: {
        base_price: 10000,
        discount_price: 10000,
        orderItems: [],
        payment_status: Enum_Order_Payment_Status.Unpaid,
        promo_codes: {data: []},
      },
    };
  }),
  updateOrderStatus: jest.fn(():boolean => {
    return true;
  }),
  markPromoCodeAsUsed: jest.fn(():boolean => {
    return true;
  }),
  markPromoCodesAsUsed: jest.fn(():boolean => {
    return true;
  }),
}));
 */

// Tests

describe("testing process order", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Processing job should return true", async () => {
    const job = await import("../src/run");
    const jobRes = await job.run({body:jobExample, headers:{}});
    expect(jobRes === true);
  });
});
