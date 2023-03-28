import {jest} from "@jest/globals";

export const fetchMock = ({
  fetch: jest.fn((url: string, params: any) => {
    return Promise.resolve({status:200, json: async () => Promise.resolve({})});
  })
})

export default fetchMock;