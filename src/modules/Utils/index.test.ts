import { Utils } from '.';

describe('Utils', () => {
  describe('convertStringToNode', () => {
    it('should return node', () => {
      const node = Utils.convertStringToNode('<div></div>');

      expect(node).toBeInstanceOf(Node);
    });
  });
});
