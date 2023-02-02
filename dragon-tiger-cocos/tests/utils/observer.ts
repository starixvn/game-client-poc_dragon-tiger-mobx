export default {
  observer: jest.fn(),
  render: jest.fn((...params: any[]) => {
    params[1] && params[1]({});

    return jest.fn();
  }),
  handle: jest.fn(),
};
