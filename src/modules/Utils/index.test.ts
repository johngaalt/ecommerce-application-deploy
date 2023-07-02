import { Utils } from '.';

describe('Utils', () => {
  describe('convertStringToNode', () => {
    it('should return node', () => {
      const node = Utils.convertStringToNode('<div></div>');

      expect(node).toBeInstanceOf(Node);
    });
  });

  describe('parseMarkup', () => {
    it('should parse html string to unicode representation', () => {
      const markup = Utils.parseMarkup('<div></div>');

      expect(markup).toBe(`&lt;div class=&quot;table&quot;&gt;
  &lt;div&gt;&lt;/div&gt;
&lt;/div&gt;`);
    });
  });
});
