import { ILevel } from '../types/ILevel';

export const LEVELS: Readonly<ILevel[]> = Object.freeze([
  {
    id: 1,
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    doThis: 'Select the plates',
    selector: 'plate',
    syntax: 'A',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    editorMarkup: '<plate />\n  <plate />',
    htmlMarkup: '  <plate></plate><plate></plate>',
  },
  {
    id: 2,
    doThis: 'Select the bento boxes',
    selector: 'bento',
    syntax: 'A',
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    editorMarkup: '<bento />\n  <plate />\n  <bento />',
    htmlMarkup: '  <bento></bento>\n  <plate></plate>\n  <bento></bento>\n    ',
  },
  {
    id: 3,
    doThis: 'Select the fancy plate',
    selector: '#fancy',
    selectorName: 'ID Selector',
    helpTitle: 'Select elements with an ID',
    syntax: '#id',
    help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    editorMarkup: '<plate id="fancy" />\n  <plate />\n  <bento />',
    htmlMarkup:
      '\n    <plate id="fancy"></plate >\n    <plate></plate>\n    <bento></bento>\n    ',
  },
  {
    id: 4,
    helpTitle: 'Select an element inside another element',
    selectorName: 'Descendant Selector',
    doThis: 'Select the apple on the plate',
    selector: 'plate apple',
    syntax: 'A&nbsp;&nbsp;B',
    help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
    examples: [
      '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    editorMarkup: '<bento />\n  <plate>\n    <apple/>\n  </plate>\n  <apple/>',
    htmlMarkup:
      '\n    <bento></bento>\n    <plate>\n      <apple/>\n    </plate>\n    <apple></apple>\n    ',
  },
  {
    id: 5,
    doThis: 'Select the pickle on the fancy plate',
    selector: '#fancy pickle',
    helpTitle: 'Combine the Descendant & ID Selectors',
    syntax: '#id&nbsp;&nbsp;A',
    help: 'You can combine any selector with the descendent selector.',
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    editorMarkup:
      '<bento>\n    <orange/>\n  </bento>\n  <plate id="fancy">\n    <pickle/>\n  </plate>\n  <plate>\n    <pickle/>\n  </plate>',
    htmlMarkup:
      '\n    <bento>\n    <orange/>\n    </bento>\n    <plate id="fancy">\n      <pickle/>\n    </plate>\n    <plate>\n      <pickle/>\n    </plate>\n    ',
  },
  {
    id: 6,
    doThis: 'Select the small apples',
    selector: '.small',
    selectorName: 'Class Selector',
    helpTitle: 'Select elements by their class',
    syntax: '.classname',
    help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: [
      '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
    ],
    editorMarkup:
      '<apple />\n  <apple class="small" />\n  <plate>\n    <apple class="small" />\n  </plate>\n  <plate />',
    htmlMarkup:
      '\n    <apple></apple>\n    <apple class="small"></apple>\n    <plate>\n      <apple class="small"></apple>\n    </plate>\n    <plate></plate>\n    ',
  },
  {
    id: 7,
    doThis: 'Select the small oranges',
    selector: 'orange.small',
    helpTitle: 'Combine the Class Selector',
    syntax: 'A.className',
    help: 'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    editorMarkup:
      '<apple/>\n  <apple class="small"/>\n  <bento>\n    <orange class="small"/>\n  </bento>\n  <plate>\n    <orange/>\n  </plate>\n  <plate>\n    <orange class="small"/>\n  </plate>',
    htmlMarkup:
      '\n    <apple></apple>\n    <apple class="small"></apple>\n    <bento>\n      <orange class="small"/>\n    </bento>\n    <plate>\n      <orange/>\n    </plate>\n    <plate>\n      <orange class="small"/>\n    </plate>',
  },
  {
    id: 8,
    doThis: 'Select the small oranges in the bentos',
    selector: 'bento orange.small',
    syntax: 'Put your back into it!',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    editorMarkup:
      '<bento>\n    <orange/>\n  </bento>\n  <orange class="small"/>\n  <bento>\n    <orange class="small"/>\n  </bento>\n  <bento>\n    <apple class="small"/>\n  </bento>\n  <bento>\n    <orange class="small"/>\n  </bento>\n    ',
    htmlMarkup:
      '\n    <bento>\n      <orange/>\n    </bento>\n    <orange class="small"></orange>\n    <bento>\n      <orange class="small"/>\n    </bento>\n    <bento>\n      <apple class="small"/>\n    </bento>\n    <bento>\n      <orange class="small"/>\n    </bento>\n    ',
  },
  {
    id: 9,
    doThis: 'Select all the plates and bentos',
    selector: 'plate,bento',
    selectorName: 'Comma Combinator',
    helpTitle: 'Combine, selectors, with... commas!',
    syntax: 'A, B',
    help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
    ],
    editorMarkup:
      '<pickle class="small"/>\n  <pickle/>\n  <plate>\n    <pickle/>\n  </plate>\n  <bento>\n    <pickle/>\n  </bento>\n  <plate>\n    <pickle/>\n  </plate>\n  <pickle/>\n  <pickle class="small"/>',
    htmlMarkup:
      '\n    <pickle class="small"></pickle>\n    <pickle></pickle>\n    <plate>\n      <pickle/>\n    </plate>\n    <bento>\n      <pickle/>\n    </bento>\n    <plate>\n      <pickle/>\n    </plate>\n    <pickle></pickle>\n    <pickle class="small"></pickle>\n    ',
  },
  {
    id: 10,
    doThis: 'Select all the things!',
    selector: '*',
    selectorName: 'The Universal Selector',
    helpTitle: 'You can select everything!',
    syntax: '*',
    help: 'You can select all elements with the universal selector! ',
    examples: [
      '<strong>p *</strong> selects any element inside all <tag>p</tag> elements.',
    ],
    editorMarkup:
      '<apple/>\n  <plate>\n    <orange class="small" />\n  </plate>\n  <bento/>\n  <bento>\n    <orange/>\n  </bento>\n  <plate id="fancy"/>',
    htmlMarkup:
      '\n    <apple></apple>\n    <plate>\n      <orange class="small" />\n    </plate>\n    <bento></bento>\n    <bento>\n      <orange/>\n    </bento>\n    <plate id="fancy"/>\n    ',
  },
]);
