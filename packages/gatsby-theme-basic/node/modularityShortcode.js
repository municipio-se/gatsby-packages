import WPModularityModule from "../src/components/WPModularityModule.js";

export default {
  inputTransforms: [
    // (input) => {
    //   input.replace(/\[modularity\b([^\]]*)\]/g, "<modularity$1></modularity>");
    // },
  ],
  treeTransforms: [
    // (tree, { visit, contentModularityModules }) => {
    //   // visit(tree, 'modularity', (node, index, parent) => {
    //   //   node.tagName = 'div';
    //   //   node.properties = {
    //   //     ...node.properties,
    //   //     className: [
    //   //       ...(node.properties && node.properties.className) || [],
    //   //       'modularity',
    //   //     ],
    //   //   };
    //   //   return [visit.SKIP, index + 1];
    //   // });
    // },
  ],
  stringifierComponents: {
    modularity: WPModularityModule,
  },
};
