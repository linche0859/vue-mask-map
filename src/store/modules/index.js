// 將每個文件註冊為相應的 Vuex 模塊。
// 模塊嵌套將反映[子]目錄層次結構，
// 模塊的命名空間與它們文件名的camelCase等效。

import camelCase from 'lodash/camelCase';

const modulesCache = {};
const storeData = { modules: {} };

(function updateModules() {
  // 讓我們動態地需要所有 Vuex 模塊文件。
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = require.context(
    // 在當前目錄中搜索文件。
    '.',
    // 在子目錄中搜索文件。
    true,
    // 包括不是該文件或單元測試的任何 .js 文件。
    /^((?!index|\.unit\.).)*\.js$/
  );

  // 對於每個 Vuex 模塊...
  requireModule.keys().forEach(fileName => {
    const moduleDefinition =
      requireModule(fileName).default || requireModule(fileName);

    // 如果熱加載過程中，引用的模塊定義與我們緩存的模塊定義相同，則跳過該模塊。
    if (modulesCache[fileName] === moduleDefinition) return;

    // 更新模塊緩存，以進行有效的熱重裝。
    modulesCache[fileName] = moduleDefinition;

    // Get the module path as an array.
    const modulePath = fileName
      // Remove the "./" from the beginning.
      .replace(/^\.\//, '')
      // Remove the file extension from the end.
      .replace(/\.\w+$/, '')
      // Split nested modules into an array path.
      .split(/\//)
      // camelCase all module namespaces and names.
      .map(camelCase);

    // 獲取當前路徑的 modules 對象
    const { modules } = getNamespace(storeData, modulePath);

    // 將模塊添加到我們的模塊對象
    modules[modulePath.pop()] = {
      // 默認情況下，模塊使用命名空間。
      namespaced: true,
      ...moduleDefinition
    };
  });

  // If the environment supports hot reloading...
  if (module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept(requireModule.id, () => {
      // Update `storeData.modules` with the latest definitions.
      updateModules();
      // Trigger a hot update in the store.
      require('../index').default.hotUpdate({ modules: storeData.modules });
    });
  }
})();

// 遞歸獲取 Vuex 模塊的名稱空間，即使嵌套也是如此。
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree;

  const namespace = path.shift();
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace]
  };
  return getNamespace(subtree.modules[namespace], path);
}

export default storeData.modules;
