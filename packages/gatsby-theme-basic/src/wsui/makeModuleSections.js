export default function makeModuleSections(
  modules,
  { ignoreBackgrounds = false } = {},
) {
  if (!modules?.length) return [];
  let rows = [];
  let currentSection = {
    modules: [],
    background: (!ignoreBackgrounds && modules[0].background) || "transparent",
  };
  let currentSectionColspan = 0;
  for (let module of modules) {
    const colspan = module.colspan || 12;
    if (
      colspan + currentSectionColspan > 12 ||
      ((!ignoreBackgrounds && module.background) || "transparent") !==
        currentSection.background
    ) {
      rows.push(currentSection);
      currentSection = {
        modules: [],
        background: (!ignoreBackgrounds && module.background) || "transparent",
      };
      currentSectionColspan = 0;
    }
    currentSection.modules.push(module);
    currentSectionColspan += colspan;
  }
  if (currentSection.modules.length) {
    rows.push(currentSection);
  }
  return rows;
}
