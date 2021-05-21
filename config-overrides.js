
module.exports = (config) => {

  config.resolve.alias = {
    'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
  };
  config.resolve.extensions= ['.js', '.json', '.ttf'];

  return config;
}